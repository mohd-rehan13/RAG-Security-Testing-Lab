import express, { Request, Response } from 'express';
import { InMemoryRetrievalService } from '../retrieval/service';
import axios from 'axios';
import { getOllamaBaseUrl, getOllamaModel, getApiPort } from '../utils/env';

// Initialize the retrieval service
const retrievalService = new InMemoryRetrievalService();

// Synthetic secret patterns to filter from output
const SYNTHETIC_SECRET_PATTERNS = [
  /LAB_SECRET_ALPHA_\d+/g,
  /SYNTHETIC_SECRET/g,
  /\[UNIQUE_ID\]/g,
  /secret\s*[:=]\s*[^\s]+/gi,
  /api[_\s]?key\s*[:=]\s*[^\s]+/gi,
  /password\s*[:=]\s*[^\s]+/gi,
  /token\s*[:=]\s*[^\s]+/gi,
  /key\s*[:=]\s*[^\s]+/gi
];

/**
 * Filter synthetic secret patterns from text output
 * @param text - Text to filter
 * @returns Filtered text with secrets redacted
 */
function filterSyntheticSecrets(text: string): string {
  let filtered = text;

  for (const pattern of SYNTHETIC_SECRET_PATTERNS) {
    filtered = filtered.replace(pattern, '[SYNTHETIC_SECRET_REDACTED]');
  }

  return filtered;
}

// Create Express app
const app = express();
app.use(express.json());

// Initialize the retrieval service on startup
async function initializeServices() {
  try {
    await retrievalService.initialize();
    console.log('Retrieval service initialized successfully');
  } catch (error) {
    console.error('Failed to retrieve service:', error);
    process.exit(1);
  }
}

// Health check endpoint - converted to test endpoint
app.get('/health', (_req: Request, res: Response) => {
  console.log('=== CUSTOM BUILD HEALTH ENDPOINT HIT ==='); // Very obvious logging
  res.send('<h1>=== CUSTOM BUILD ACTIVE ===</h1>');
});

// Chat endpoint - handle both GET (for browser interface) and POST (API)
app.get('/chat', (_req: Request, res: Response) => {
  console.log('=== CUSTOM BUILD CHAT ENDPOINT HIT ===');
  // Serve a functional HTML interface for browser testing
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>NEURAL-NET RAG INTERFACE</title>
        <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@500;600;700&display=swap" rel="stylesheet">
        <style>
          :root {
            --bg-black: #050505;
            --bg-panel: rgba(10, 20, 30, 0.8);
            --neon-green: #00ff41;
            --neon-cyan: #00f0ff;
            --neon-pink: #ff003c;
            --grid-color: rgba(0, 240, 255, 0.1);
            --text-main: #e0f8ff;
            --text-dim: #5c8799;
          }
          
          * { box-sizing: border-box; margin: 0; padding: 0; }
          
          body { 
            font-family: 'Rajdhani', sans-serif; 
            background-color: var(--bg-black);
            background-image: 
              linear-gradient(var(--grid-color) 1px, transparent 1px),
              linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
            background-size: 30px 30px;
            background-position: center center;
            color: var(--text-main);
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 2rem 1rem;
            position: relative;
            overflow: hidden;
          }
          
          /* CRT scanline effect */
          body::after {
            content: " ";
            display: block;
            position: absolute;
            top: 0; left: 0; bottom: 0; right: 0;
            background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
            z-index: 2;
            background-size: 100% 2px, 3px 100%;
            pointer-events: none;
          }
          
          .dashboard {
            width: 100%;
            max-width: 1000px;
            background: var(--bg-panel);
            backdrop-filter: blur(5px);
            border: 1px solid var(--neon-cyan);
            box-shadow: 0 0 20px rgba(0, 240, 255, 0.2), inset 0 0 20px rgba(0, 240, 255, 0.1);
            display: flex;
            flex-direction: column;
            height: calc(100vh - 4rem);
            position: relative;
            z-index: 10;
            clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%);
          }
          
          .header {
            padding: 1.25rem 2rem;
            border-bottom: 1px solid var(--neon-cyan);
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: rgba(0, 240, 255, 0.05);
          }
          
          .header h1 {
            font-family: 'Share Tech Mono', monospace;
            font-size: 1.5rem;
            color: var(--neon-cyan);
            text-shadow: 0 0 8px var(--neon-cyan);
            display: flex;
            align-items: center;
            gap: 10px;
            letter-spacing: 2px;
          }
          
          .controls {
            display: flex;
            gap: 15px;
            align-items: center;
          }
          
          .toggle-container {
            display: flex;
            align-items: center;
            gap: 8px;
            font-family: 'Share Tech Mono', monospace;
            font-size: 0.8rem;
            color: var(--neon-green);
          }

          .switch {
            position: relative;
            display: inline-block;
            width: 40px;
            height: 20px;
          }

          .switch input { opacity: 0; width: 0; height: 0; }

          .slider {
            position: absolute;
            cursor: pointer;
            top: 0; left: 0; right: 0; bottom: 0;
            background-color: rgba(0, 255, 65, 0.2);
            transition: .4s;
            border: 1px solid var(--neon-green);
          }

          .slider:before {
            position: absolute;
            content: "";
            height: 14px; width: 14px;
            left: 2px; bottom: 2px;
            background-color: var(--neon-green);
            transition: .4s;
          }

          input:checked + .slider {
            background-color: var(--neon-pink);
            border-color: var(--neon-pink);
            box-shadow: 0 0 10px var(--neon-pink);
          }

          input:checked + .slider:before {
            transform: translateX(20px);
            background-color: #fff;
          }
          
          .btn-icon {
            background: transparent;
            border: 1px solid var(--neon-pink);
            color: var(--neon-pink);
            padding: 5px 10px;
            font-family: 'Share Tech Mono', monospace;
            font-size: 0.8rem;
            cursor: pointer;
            transition: all 0.2s;
            box-shadow: inset 0 0 5px rgba(255,0,60,0.5);
          }
          
          .btn-icon:hover {
            background: var(--neon-pink);
            color: #000;
            box-shadow: 0 0 15px var(--neon-pink);
          }
          
          #chat-history { 
            flex: 1;
            padding: 2rem;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            scroll-behavior: smooth;
          }
          
          .msg-block {
            display: flex;
            flex-direction: column;
            gap: 5px;
            max-width: 85%;
            animation: glitch-in 0.3s forwards;
          }
          
          @keyframes glitch-in {
            0% { transform: translate(-10px, 5px) skewX(20deg); opacity: 0; filter: hue-rotate(90deg); }
            50% { transform: translate(5px, -2px) skewX(-10deg); opacity: 0.8; filter: hue-rotate(-90deg); }
            100% { transform: translate(0) skewX(0); opacity: 1; filter: none; }
          }
          
          .msg-block.user { align-self: flex-end; }
          .msg-block.bot { align-self: flex-start; }
          
          .msg-label {
            font-size: 0.85rem;
            font-family: 'Share Tech Mono', monospace;
            letter-spacing: 1px;
            display: flex;
            align-items: center;
            gap: 8px;
            text-transform: uppercase;
          }
          
          .msg-block.user .msg-label { color: var(--neon-cyan); justify-content: flex-end; }
          .msg-block.bot .msg-label { color: var(--neon-green); }
          .msg-block.error .msg-label { color: var(--neon-pink); }
          
          .msg-content {
            padding: 1.25rem;
            line-height: 1.6;
            word-wrap: break-word;
            font-size: 1.1rem;
            background: rgba(0,0,0,0.6);
            border: 1px solid;
            position: relative;
          }
          
          .msg-block.user .msg-content {
            border-color: var(--neon-cyan);
            border-right: 4px solid var(--neon-cyan);
            box-shadow: -5px 5px 15px rgba(0, 240, 255, 0.1);
          }
          
          .msg-block.bot .msg-content {
            border-color: var(--neon-green);
            border-left: 4px solid var(--neon-green);
            box-shadow: 5px 5px 15px rgba(0, 255, 65, 0.1);
          }
          
          .msg-block.error .msg-content {
            border-color: var(--neon-pink);
            border-left: 4px solid var(--neon-pink);
            background: rgba(255, 0, 60, 0.1);
            text-shadow: 0 0 5px var(--neon-pink);
          }

          /* Interactive Accordion for Sources */
          details.source-citations {
            margin-top: 1rem;
            border: 1px solid rgba(0, 255, 65, 0.3);
            background: rgba(0, 255, 65, 0.05);
            padding: 0.5rem 1rem;
            font-family: 'Share Tech Mono', monospace;
            font-size: 0.9rem;
            cursor: pointer;
            transition: background 0.3s;
          }
          
          details.source-citations:hover {
            background: rgba(0, 255, 65, 0.1);
          }

          details.source-citations summary {
            outline: none;
            color: var(--neon-green);
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          
          details.source-citations summary::-webkit-details-marker { display: none; }
          details.source-citations summary::before { content: "[+]"; }
          details.source-citations[open] summary::before { content: "[-]"; }
          
          details.source-citations ul { 
            padding-left: 1rem; 
            margin-top: 0.75rem; 
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            list-style-type: none;
            color: var(--text-dim);
          }
          
          details.source-citations ul li::before {
            content: ">";
            color: var(--neon-green);
            margin-right: 8px;
          }
          
          .input-area {
            padding: 1.5rem 2rem;
            background: rgba(0, 0, 0, 0.8);
            border-top: 1px solid var(--neon-cyan);
          }
          
          #chat-form {
            display: flex;
            gap: 1rem;
          }
          
          input[type="text"] { 
            flex: 1;
            padding: 1rem 1.5rem; 
            background: rgba(0, 240, 255, 0.02);
            border: 1px solid var(--neon-cyan); 
            color: var(--neon-cyan);
            font-family: 'Share Tech Mono', monospace;
            font-size: 1.1rem;
            transition: all 0.3s;
            box-shadow: inset 0 0 10px rgba(0, 240, 255, 0.1);
          }
          
          input[type="text"]:focus {
            outline: none;
            background: rgba(0, 240, 255, 0.1);
            box-shadow: 0 0 15px rgba(0, 240, 255, 0.4), inset 0 0 10px rgba(0, 240, 255, 0.2);
          }
          
          input[type="text"]::placeholder {
            color: rgba(0, 240, 255, 0.3);
          }
          
          .btn-primary { 
            padding: 0 2.5rem; 
            background: transparent; 
            color: var(--neon-cyan); 
            border: 1px solid var(--neon-cyan); 
            font-weight: 700;
            cursor: pointer; 
            transition: all 0.2s;
            font-family: 'Share Tech Mono', monospace;
            font-size: 1.1rem;
            text-transform: uppercase;
            box-shadow: inset 0 0 10px rgba(0, 240, 255, 0.2);
            clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
          }

          .btn-primary:hover { 
            background: var(--neon-cyan);
            color: var(--bg-black);
            box-shadow: 0 0 20px var(--neon-cyan); 
          }
          
          .btn-primary:disabled { 
            border-color: var(--text-dim);
            color: var(--text-dim);
            box-shadow: none;
            cursor: wait; 
          }
          
          .typing-cursor::after {
            content: "█";
            animation: blink 1s step-end infinite;
            color: var(--neon-green);
            margin-left: 5px;
          }
          
          @keyframes blink { 50% { opacity: 0; } }

          ::-webkit-scrollbar { width: 10px; }
          ::-webkit-scrollbar-track { background: rgba(0, 240, 255, 0.05); border-left: 1px solid rgba(0, 240, 255, 0.2); }
          ::-webkit-scrollbar-thumb { background: rgba(0, 240, 255, 0.4); }
          ::-webkit-scrollbar-thumb:hover { background: var(--neon-cyan); box-shadow: 0 0 10px var(--neon-cyan); }
        </style>
      </head>
      <body>
        <div class="dashboard">
          <div class="header">
            <h1>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square">
                <path d="M4 17L10 11 4 5"></path><line x1="12" y1="19" x2="20" y2="19"></line>
              </svg>
              NEURAL-NET RAG v3.1
            </h1>
            <div class="controls">
              <label class="toggle-container">
                DECRYPT MODE
                <div class="switch">
                  <input type="checkbox" id="debug-toggle">
                  <span class="slider"></span>
                </div>
              </label>
              <button class="btn-icon" id="clear-btn" title="Purge Terminal">PURGE</button>
            </div>
          </div>
          
          <div id="chat-history">
            <div class="msg-block bot">
              <div class="msg-label">SYS.AI_NODE</div>
              <div class="msg-content"><span id="welcome-text"></span><span class="typing-cursor"></span></div>
            </div>
          </div>
          
          <div class="input-area">
            <form id="chat-form">
              <input type="text" id="message" placeholder="> Enter command sequence..." required autocomplete="off" />
              <button type="submit" class="btn-primary" id="submit-btn">EXECUTE</button>
            </form>
          </div>
        </div>
        
        <script>
          // Typewriter effect for welcome message
          const welcomeMsg = "Connection established. RAG Security Testing Lab active.\\nAwaiting query input for prompt injection & leakage validation.";
          const welcomeEl = document.getElementById('welcome-text');
          let i = 0;
          function typeWriter() {
            if (i < welcomeMsg.length) {
              if (welcomeMsg.charAt(i) === '\\\\' && welcomeMsg.charAt(i+1) === 'n') {
                welcomeEl.innerHTML += "<br>";
                i += 2;
              } else {
                welcomeEl.innerHTML += welcomeMsg.charAt(i);
                i++;
              }
              setTimeout(typeWriter, 30);
            } else {
              document.querySelector('.typing-cursor').style.display = 'none';
            }
          }
          setTimeout(typeWriter, 500);

          // Clear Terminal interaction
          document.getElementById('clear-btn').addEventListener('click', () => {
            const history = document.getElementById('chat-history');
            history.innerHTML = \`
              <div class="msg-block bot">
                <div class="msg-label">SYS.AI_NODE</div>
                <div class="msg-content">Terminal purged. Awaiting new sequence.</div>
              </div>\`;
          });

          // Chat form logic
          const form = document.getElementById('chat-form');
          const msgInput = document.getElementById('message');
          const history = document.getElementById('chat-history');
          const submitBtn = document.getElementById('submit-btn');
          
          form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const msg = msgInput.value.trim();
            if(!msg) return;
            
            const isDebug = document.getElementById('debug-toggle').checked;
            
            msgInput.value = '';
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'HACKING...';
            
            // Add user message
            history.innerHTML += \`
              <div class="msg-block user">
                <div class="msg-label">USR.OPERATIVE</div>
                <div class="msg-content">\${msg.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
              </div>\`;
            history.scrollTop = history.scrollHeight;
            
            try {
              const res = await fetch('/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: msg })
              });
              
              const data = await res.json();
              
              if (res.ok) {
                let citationsHTML = '';
                if (data.sources && data.sources.length > 0) {
                  const sourcesList = data.sources.map(s => \`<li>[BLOCK \${s.id}] <strong>\${s.source.split('/').pop()}</strong> (Rel: \${s.relevance.toFixed(2)})\${isDebug ? '<br>'+s.content.substring(0,50)+'...' : ''}</li>\`).join('');
                  // Use interactive details/summary accordion
                  citationsHTML = \`
                    <details class="source-citations">
                      <summary>VIEW EXTRACTED DATA BLOCKS (\${data.sources.length})</summary>
                      <ul>\${sourcesList}</ul>
                    </details>\`;
                }
                
                history.innerHTML += \`
                  <div class="msg-block bot">
                    <div class="msg-label">SYS.AI_NODE</div>
                    <div class="msg-content">\${data.answer.replace(/\\n/g, "<br>").replace(/</g, "&lt;").replace(/>/g, "&gt;")}\${citationsHTML}</div>
                  </div>\`;
              } else {
                history.innerHTML += \`
                  <div class="msg-block error">
                    <div class="msg-label">ERR.CRITICAL_FAULT</div>
                    <div class="msg-content">\${data.error || 'Unknown error'} \${data.details ? '- ' + data.details : ''}</div>
                  </div>\`;
              }
            } catch (err) {
              history.innerHTML += \`
                <div class="msg-block error">
                  <div class="msg-label">ERR.CONNECTION_LOST</div>
                  <div class="msg-content">\${err.message}</div>
                </div>\`;
            }
            
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'EXECUTE';
            history.scrollTop = history.scrollHeight;
          });
        </script>
      </body>
    </html>
  `);
});

// Chat endpoint - POST for API usage
app.post('/chat', async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required and must be a string' });
    }

    // Retrieve relevant documents
    const results = await retrievalService.retrieve(message, 5);

    // Build context from retrieved documents
    const context = results
      .map((result, index) => {
        return `[Source ${index + 1}: ${result.source}]\n${result.content}`;
      })
      .join('\n\n');

    // Prepare the prompt for Ollama
    const prompt = context
      ? `Answer the following question based on the provided context. If the context doesn't contain enough information to answer the question, say so. Always cite your sources using the format [Source X] where X is the source number.

Context:
${context}

Question: ${message}

Answer:`
      : `Question: ${message}

Answer:`;

    // Call Ollama API
    const ollamaResponse = await axios.post(
      `${getOllamaBaseUrl()}/api/generate`,
      {
        model: getOllamaModel(),
        prompt: prompt,
        stream: false
      },
      {
        timeout: 300000 // 5 minute timeout for local LLM generation
      }
    );

    let answer = ollamaResponse.data.response;

    // Apply output filtering for synthetic secret patterns
    answer = filterSyntheticSecrets(answer);

    // Prepare response with citations
    const response = {
      answer: answer,
      sources: results.map((result, index) => ({
        id: index + 1,
        source: result.source,
        content: result.content.substring(0, 200) + (result.content.length > 200 ? '...' : ''),
        relevance: result.relevance
      })),
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    if (axios.isAxiosError(error)) {
      res.status(503).json({
        error: 'Ollama service unavailable',
        details: error.message
      });
    } else {
      res.status(500).json({
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
});

// Start the server
const PORT = getApiPort();
app.listen(PORT, () => {
  console.log('=== CUSTOM SERVER STARTING ON PORT ' + PORT + ' ===');
  console.log(`RAG API server listening on http://localhost:${PORT}`);

  // Initialize services after server starts
  initializeServices().catch(err => {
    console.error('Failed to initialize services:', err);
  });
});

export default app;
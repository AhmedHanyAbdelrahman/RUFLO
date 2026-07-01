// Thin abstraction over the LLM provider so generation/classification code
// never talks to a vendor SDK directly. Switch providers via AI_PROVIDER env var.

export interface CompletionRequest {
  system: string;
  prompt: string;
  maxTokens?: number;
  temperature?: number;
}

export interface AiProvider {
  complete(req: CompletionRequest): Promise<string>;
}

class AnthropicProvider implements AiProvider {
  async complete({ system, prompt, maxTokens = 400, temperature = 0.4 }: CompletionRequest): Promise<string> {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL || 'claude-sonnet-5',
        max_tokens: maxTokens,
        temperature,
        system,
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    if (!res.ok) throw new Error(`Anthropic API error: ${res.status} ${await res.text()}`);
    const data = await res.json();
    return data.content?.[0]?.text ?? '';
  }
}

class OpenAiProvider implements AiProvider {
  async complete({ system, prompt, maxTokens = 400, temperature = 0.4 }: CompletionRequest): Promise<string> {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL || 'gpt-4o-mini',
        max_tokens: maxTokens,
        temperature,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: prompt },
        ],
      }),
    });
    if (!res.ok) throw new Error(`OpenAI API error: ${res.status} ${await res.text()}`);
    const data = await res.json();
    return data.choices?.[0]?.message?.content ?? '';
  }
}

export function getAiProvider(): AiProvider {
  const provider = (process.env.AI_PROVIDER || 'anthropic').toLowerCase();
  if (provider === 'openai') return new OpenAiProvider();
  return new AnthropicProvider();
}

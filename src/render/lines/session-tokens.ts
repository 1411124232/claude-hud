import type { RenderContext } from '../../types.js';
import { RESET } from '../colors.js';
import { t } from '../../i18n/index.js';
import { formatTokens } from '../../utils/format.js';

const TEAL = '\x1b[38;5;73m';
const GRAY = '\x1b[38;5;243m';

export function formatSessionTokenSummary(
  tokens: NonNullable<RenderContext['transcript']['sessionTokens']>,
  prefix: string,
): string | null {
  const total = tokens.inputTokens + tokens.outputTokens + tokens.cacheCreationTokens + tokens.cacheReadTokens;

  const parts: string[] = [];
  if (tokens.inputTokens > 0) {
    parts.push(`${TEAL}${t('format.in')}${RESET} ${GRAY}${formatTokens(tokens.inputTokens)}${RESET}`);
  }
  if (tokens.outputTokens > 0) {
    parts.push(`${TEAL}${t('format.out')}${RESET} ${GRAY}${formatTokens(tokens.outputTokens)}${RESET}`);
  }
  if (tokens.cacheCreationTokens > 0) {
    parts.push(`${TEAL}C·W${RESET} ${GRAY}${formatTokens(tokens.cacheCreationTokens)}${RESET}`);
  }
  if (tokens.cacheReadTokens > 0) {
    parts.push(`${TEAL}C·R${RESET} ${GRAY}${formatTokens(tokens.cacheReadTokens)}${RESET}`);
  }

  const head = `${TEAL}${prefix}${RESET} ${GRAY}${formatTokens(total)}${RESET}`;
  return parts.length > 0
    ? `${head} [${parts.join(', ')}]`
    : head;
}

export function renderSessionTokensLine(ctx: RenderContext): string | null {
  const display = ctx.config?.display;
  if (display?.showSessionTokens === false) {
    return null;
  }

  const tokens = ctx.transcript.sessionTokens;
  if (!tokens) {
    return null;
  }

  return formatSessionTokenSummary(tokens, t('label.tokens'));
}

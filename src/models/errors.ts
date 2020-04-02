const EOL = `\r\n`;

function formatErrors(errors: string[]): string {
  const formattedErrors = errors.reduce((acc, err) => {
    acc = `${acc}${EOL} - ${err}`;
    return acc;
  }, '');

  return formattedErrors;
}

export class InvalidConfigurationError extends Error {
  constructor(errors: string[]) {
    super(`Invalid configuration:${formatErrors(errors)}`);
  }
}

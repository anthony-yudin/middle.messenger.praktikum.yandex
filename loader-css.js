export async function resolve(specifier, context, next) {
  const nextResult = await next(specifier, context);

  if (!specifier.endsWith('.less')) return nextResult;

  return {
    format: 'less',
    shortCircuit: true,
    url: nextResult.url,
  };
}

export async function load(url, context, next) {
  if (context.format !== 'less') return next(url, context);

  return {
    format: 'module',
    shortCircuit: true,
    source: '',
  };
}

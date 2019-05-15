// originally lifted from https://nodejs.org/api/esm.html

import path from 'path';
import process from 'process';
import Module from 'module';

const builtins = Module.builtinModules;

const baseURL = new URL('file://');
const binaryen_root = path.dirname(path.dirname(process.cwd()));
baseURL.pathname = `${binaryen_root}/`;


export function resolve(specifier, parentModuleURL = baseURL, defaultResolve) {
  if (builtins.includes(specifier)) {
    return {
      url: specifier,
      format: 'builtin'
    };
  }
  // Resolve the 'spectest' and 'env' modules to our custom implementations of
  // various builtins.
  if (specifier == 'spectest' || specifier == 'env') {
    const resolved = new URL('./scripts/test/' + specifier + '.js', baseURL);
    return {
      url: resolved.href,
      format: 'esm'
    };
  }

  const resolved = new URL(specifier, parentModuleURL);
  return {
    url: resolved.href,
    format: 'esm'
  };
}

export const synonyms = {
  js: 'javascript',
  javascript: 'js',
  ts: 'typescript',
  typescript: 'ts',
  ai: 'artificial intelligence',
  'artificial intelligence': 'ai',
  ml: 'machine learning',
  'machine learning': 'ml',
  py: 'python',
  python: 'py',
  react: 'reactjs',
  reactjs: 'react',
  node: 'nodejs',
  nodejs: 'node',
  gh: 'github',
  github: 'gh',
  vc: 'version control',
  'version control': 'vc',
  repo: 'repository',
  repository: 'repo',
  cli: 'command line',
  'command line': 'cli',
  ssh: 'secure shell',
  pr: 'pull request',
  'pull request': 'pr',
  init: 'initialize',
  initialize: 'init',
  config: 'configuration',
  configuration: 'config',
  auth: 'authentication',
  authentication: 'auth',
  dep: 'dependency',
  dependency: 'dep',
  prod: 'production',
  production: 'prod',
  dev: 'development',
  development: 'dev',
  doc: 'documentation',
  documentation: 'doc',
  'ui': 'user interface',
  'ux': 'user experience',
};

export function expandSynonyms(query) {
  const words = query.toLowerCase().split(/\s+/);
  const expanded = new Set(words);

  words.forEach(word => {
    if (synonyms[word]) expanded.add(synonyms[word]);
    Object.entries(synonyms).forEach(([key, val]) => {
      if (val === word) expanded.add(key);
    });
  });

  return [...expanded];
}

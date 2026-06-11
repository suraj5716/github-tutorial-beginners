export const topicCategories = [
  { id: 'basics', label: 'Basics', color: '#3b82f6' },
  { id: 'setup', label: 'Setup', color: '#6366f1' },
  { id: 'commands', label: 'Commands', color: '#10b981' },
  { id: 'advanced', label: 'Advanced', color: '#f59e0b' },
  { id: 'errors', label: 'Errors', color: '#ef4444' },
];

export const tutorials = [
  {
    id: 'what-is-git',
    title: 'What is Git',
    category: 'basics',
    shortDesc: 'Version control system for tracking code changes',
    explanation: 'Git is a distributed version control system that tracks changes in source code during software development. It allows multiple developers to work on the same project without interfering with each other.',
    command: 'git --version',
    color: '#3b82f6',
    nodes: [
      { id: 'git-1', label: 'Local Repository', desc: 'Your code lives here' },
      { id: 'git-2', label: 'Staging Area', desc: 'Changes prepared for commit' },
      { id: 'git-3', label: 'Working Directory', desc: 'Where you edit files' },
    ],
  },
  {
    id: 'what-is-github',
    title: 'What is GitHub',
    category: 'basics',
    shortDesc: 'Cloud platform for hosting Git repositories',
    explanation: 'GitHub is a web-based platform that uses Git for version control. It provides a collaborative environment for developers to host, review, and manage code projects.',
    command: '',
    color: '#6366f1',
    nodes: [
      { id: 'gh-1', label: 'Remote Repository', desc: 'Code hosted on GitHub' },
      { id: 'gh-2', label: 'Pull Requests', desc: 'Propose code changes' },
      { id: 'gh-3', label: 'Issues', desc: 'Track bugs and features' },
      { id: 'gh-4', label: 'Actions', desc: 'Automate workflows' },
    ],
  },
  {
    id: 'git-installation',
    title: 'Git Installation',
    category: 'setup',
    shortDesc: 'Install Git on your machine',
    explanation: 'Download and install Git from the official website. After installation, configure your username and email — these will be attached to your commits.',
    command: 'git config --global user.name "Your Name"\ngit config --global user.email "your@email.com"',
    color: '#6366f1',
    nodes: [
      { id: 'inst-1', label: 'Download Git', desc: 'Visit git-scm.com' },
      { id: 'inst-2', label: 'Run Installer', desc: 'Follow setup wizard' },
      { id: 'inst-3', label: 'Verify Install', desc: 'git --version' },
      { id: 'inst-4', label: 'Configure Identity', desc: 'Set name & email' },
    ],
  },
  {
    id: 'git-init',
    title: 'git init',
    category: 'commands',
    shortDesc: 'Initialize a new Git repository',
    explanation: 'The git init command creates a new Git repository in your project folder. It sets up the necessary .git directory where Git stores all its tracking data.',
    command: 'cd my-project\ngit init',
    color: '#10b981',
    nodes: [
      { id: 'init-1', label: 'Create Project Folder', desc: 'mkdir my-project' },
      { id: 'init-2', label: 'Navigate Into It', desc: 'cd my-project' },
      { id: 'init-3', label: 'Initialize Git', desc: 'git init' },
      { id: 'init-4', label: 'Verify', desc: 'ls -la .git' },
    ],
  },
  {
    id: 'git-add',
    title: 'git add',
    category: 'commands',
    shortDesc: 'Stage changes for commit',
    explanation: 'The git add command adds file changes to the staging area. Think of it as telling Git "I want to include these changes in the next commit."',
    command: 'git add filename.txt\ngit add .\ngit add *.js',
    color: '#10b981',
    nodes: [
      { id: 'add-1', label: 'Edit Files', desc: 'Make your changes' },
      { id: 'add-2', label: 'Check Status', desc: 'git status' },
      { id: 'add-3', label: 'Stage File', desc: 'git add <file>' },
      { id: 'add-4', label: 'Stage All', desc: 'git add .' },
    ],
  },
  {
    id: 'git-commit',
    title: 'git commit',
    category: 'commands',
    shortDesc: 'Save staged changes with a message',
    explanation: 'The git commit command takes the staged snapshot and saves it to the project history. Each commit has a unique ID and a descriptive message.',
    command: 'git commit -m "Add login feature"',
    color: '#10b981',
    nodes: [
      { id: 'com-1', label: 'Stage Changes', desc: 'git add .' },
      { id: 'com-2', label: 'Write Message', desc: 'Describe your changes' },
      { id: 'com-3', label: 'Commit', desc: 'git commit -m "msg"' },
      { id: 'com-4', label: 'View History', desc: 'git log --oneline' },
    ],
  },
  {
    id: 'git-push',
    title: 'git push',
    category: 'commands',
    shortDesc: 'Upload commits to a remote repository',
    explanation: 'The git push command uploads your local commits to a remote repository (like GitHub). This makes your changes available to your team.',
    command: 'git push origin main',
    color: '#10b981',
    nodes: [
      { id: 'push-1', label: 'Commit Locally', desc: 'git commit -m "msg"' },
      { id: 'push-2', label: 'Add Remote', desc: 'git remote add origin <url>' },
      { id: 'push-3', label: 'Push Changes', desc: 'git push origin main' },
      { id: 'push-4', label: 'Verify on GitHub', desc: 'Check your repository' },
    ],
  },
  {
    id: 'creating-repos',
    title: 'Creating Repositories',
    category: 'setup',
    shortDesc: 'Create repos locally and on GitHub',
    explanation: 'You can create a repository locally with git init or on GitHub through the web interface. Remote repos enable collaboration and backup.',
    command: 'echo "# My Project" >> README.md\ngit init\ngit add README.md\ngit commit -m "first commit"\ngit branch -M main\ngit remote add origin <url>\ngit push -u origin main',
    color: '#6366f1',
    nodes: [
      { id: 'cr-1', label: 'Create on GitHub', desc: 'Click "New repository"' },
      { id: 'cr-2', label: 'Clone or Init', desc: 'git clone or git init' },
      { id: 'cr-3', label: 'Add Files', desc: 'Create your project files' },
      { id: 'cr-4', label: 'First Commit', desc: 'git add & git commit' },
      { id: 'cr-5', label: 'Push to Remote', desc: 'git push -u origin main' },
    ],
  },
  {
    id: 'cloning-repos',
    title: 'Cloning Repositories',
    category: 'setup',
    shortDesc: 'Copy a remote repo to your machine',
    explanation: 'Cloning downloads a copy of a remote repository to your local machine. You get the entire project history and can start contributing immediately.',
    command: 'git clone https://github.com/user/repo.git',
    color: '#6366f1',
    nodes: [
      { id: 'clone-1', label: 'Find Repository URL', desc: 'On GitHub, click Code' },
      { id: 'clone-2', label: 'Run Clone Command', desc: 'git clone <url>' },
      { id: 'clone-3', label: 'Enter Directory', desc: 'cd repo-name' },
      { id: 'clone-4', label: 'Start Working', desc: 'Make changes' },
    ],
  },
  {
    id: 'updating-repos',
    title: 'Updating Repositories',
    category: 'commands',
    shortDesc: 'Keep your local repo in sync',
    explanation: 'Use git pull to fetch and merge changes from the remote repository. This keeps your local copy up to date with your team\'s work.',
    command: 'git pull origin main',
    color: '#10b981',
    nodes: [
      { id: 'up-1', label: 'Check Status', desc: 'git status' },
      { id: 'up-2', label: 'Fetch Changes', desc: 'git fetch' },
      { id: 'up-3', label: 'Pull Updates', desc: 'git pull origin main' },
      { id: 'up-4', label: 'Resolve Conflicts', desc: 'If any, edit & commit' },
    ],
  },
  {
    id: 'branching',
    title: 'Branching',
    category: 'advanced',
    shortDesc: 'Create isolated development branches',
    explanation: 'Branching lets you create independent lines of development. You can work on features without affecting the main codebase, then merge when ready.',
    command: 'git branch feature-login\ngit checkout feature-login\n# or combined:\ngit checkout -b feature-login',
    color: '#f59e0b',
    nodes: [
      { id: 'br-1', label: 'Create Branch', desc: 'git branch <name>' },
      { id: 'br-2', label: 'Switch Branch', desc: 'git checkout <name>' },
      { id: 'br-3', label: 'Make Changes', desc: 'Work on your feature' },
      { id: 'br-4', label: 'Commit', desc: 'git add & git commit' },
      { id: 'br-5', label: 'Merge Back', desc: 'git checkout main\ngit merge <name>' },
    ],
  },
  {
    id: 'pull-requests',
    title: 'Pull Requests',
    category: 'advanced',
    shortDesc: 'Propose and review code changes',
    explanation: 'A pull request (PR) is a proposal to merge changes from one branch into another. It allows team members to review code, discuss changes, and approve before merging.',
    command: '# Push branch first\ngit push origin feature-login\n# Then create PR on GitHub',
    color: '#f59e0b',
    nodes: [
      { id: 'pr-1', label: 'Push Branch', desc: 'git push origin <branch>' },
      { id: 'pr-2', label: 'Open PR on GitHub', desc: 'Click "Pull Request"' },
      { id: 'pr-3', label: 'Describe Changes', desc: 'Add title & description' },
      { id: 'pr-4', label: 'Review & Discuss', desc: 'Team reviews code' },
      { id: 'pr-5', label: 'Merge PR', desc: 'Click "Merge pull request"' },
    ],
  },
  {
    id: 'gitignore',
    title: '.gitignore',
    category: 'advanced',
    shortDesc: 'Ignore files you don\'t want tracked',
    explanation: 'The .gitignore file tells Git which files to ignore. This is useful for excluding node_modules, environment files, build outputs, and other generated files.',
    command: '# .gitignore example\nnode_modules/\n.env\n.DS_Store\nbuild/\n*.log',
    color: '#f59e0b',
    nodes: [
      { id: 'gi-1', label: 'Create .gitignore', desc: 'In project root' },
      { id: 'gi-2', label: 'Add Patterns', desc: 'File/folder names to ignore' },
      { id: 'gi-3', label: 'Track It', desc: 'git add .gitignore' },
      { id: 'gi-4', label: 'Commit', desc: 'git commit -m "Add gitignore"' },
    ],
  },
  {
    id: 'common-errors',
    title: 'Common Git Errors',
    category: 'errors',
    shortDesc: 'Fix frequent Git mistakes',
    explanation: 'Beginners often encounter merge conflicts, detached HEAD states, and authentication issues. Understanding these errors helps you recover quickly.',
    command: '# Fix detached HEAD:\ngit checkout main\n\n# Abort merge conflict:\ngit merge --abort\n\n# Undo last commit (keep changes):\ngit reset --soft HEAD~1',
    color: '#ef4444',
    nodes: [
      { id: 'err-1', label: 'Merge Conflict', desc: 'Edit conflicted files' },
      { id: 'err-2', label: 'Detached HEAD', desc: 'Create a branch' },
      { id: 'err-3', label: 'Authentication', desc: 'Check SSH keys / token' },
      { id: 'err-4', label: 'Wrong Remote', desc: 'git remote set-url' },
    ],
  },
];

export function getFlowForTutorial(tutorialId) {
  const tutorial = tutorials.find(t => t.id === tutorialId);
  if (!tutorial) return null;

  const nodes = [];
  const edges = [];

  tutorial.nodes.forEach((node, index) => {
    nodes.push({
      id: `t-${tutorialId}-${node.id}`,
      type: 'tutorialNode',
      position: { x: 50 + index * 220, y: 100 + (index % 2) * 100 },
      data: {
        label: node.label,
        desc: node.desc,
        color: tutorial.color,
        category: tutorial.category,
        tutorialTitle: tutorial.title,
      },
    });

    if (index < tutorial.nodes.length - 1) {
      edges.push({
        id: `e-${tutorialId}-${node.id}-${tutorial.nodes[index + 1].id}`,
        source: `t-${tutorialId}-${node.id}`,
        target: `t-${tutorialId}-${tutorial.nodes[index + 1].id}`,
        animated: true,
        style: { stroke: tutorial.color, strokeWidth: 2 },
      });
    }
  });

  return { nodes, edges };
}

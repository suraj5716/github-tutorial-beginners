export const categories = [
  { id: 'all', label: 'All Commands', color: '#6b7280' },
  { id: 'stage', label: 'Stage & Snapshot', color: '#3b82f6' },
  { id: 'setup', label: 'Setup & Init', color: '#6366f1' },
  { id: 'branch', label: 'Branch & Merge', color: '#f59e0b' },
  { id: 'share', label: 'Share & Update', color: '#10b981' },
  { id: 'track', label: 'Track Path Changes', color: '#8b5cf6' },
  { id: 'temp', label: 'Temporary Commits', color: '#ec4899' },
  { id: 'rewrite', label: 'Rewrite History', color: '#f97316' },
  { id: 'inspect', label: 'Inspect & Compare', color: '#06b6d4' },
  { id: 'ignore', label: 'Ignoring Patterns', color: '#6b7280' },
];

export const sectionDescriptions = {
  stage: 'Working with snapshots and the Git staging area',
  setup: 'Configuring user information, initializing and cloning repositories',
  branch: 'Isolating work in branches, changing context, and integrating changes',
  share: 'Retrieving updates from another repository and updating local repos',
  track: 'Versioning file removes and path changes',
  temp: 'Temporarily store modified, tracked files in order to change branches',
  rewrite: 'Rewriting branches, updating commits and clearing history',
  inspect: 'Examining logs, diffs and object information',
  ignore: 'Preventing unintentional staging or committing of files',
};

export const commands = [
  // STAGE & SNAPSHOT
  {
    command: 'git status',
    desc: 'Show modified files in working directory, staged for your next commit',
    example: 'git status',
    category: 'stage',
  },
  {
    command: 'git add [file]',
    desc: 'Add a file as it looks now to your next commit (stage)',
    example: 'git add index.js',
    category: 'stage',
  },
  {
    command: 'git reset [file]',
    desc: 'Unstage a file while retaining the changes in working directory',
    example: 'git reset index.js',
    category: 'stage',
  },
  {
    command: 'git diff',
    desc: 'Diff of what is changed but not staged',
    example: 'git diff',
    category: 'stage',
  },
  {
    command: 'git diff --staged',
    desc: 'Diff of what is staged but not yet committed',
    example: 'git diff --staged',
    category: 'stage',
  },
  {
    command: 'git commit -m "[message]"',
    desc: 'Commit your staged content as a new commit snapshot',
    example: 'git commit -m "Add login feature"',
    category: 'stage',
  },

  // SETUP & INIT
  {
    command: 'git config --global user.name "[name]"',
    desc: 'Set a name identifiable for credit when reviewing version history',
    example: 'git config --global user.name "Your Name"',
    category: 'setup',
  },
  {
    command: 'git config --global user.email "[email]"',
    desc: 'Set an email address associated with each history marker',
    example: 'git config --global user.email "you@example.com"',
    category: 'setup',
  },
  {
    command: 'git config --global color.ui auto',
    desc: 'Set automatic command line coloring for easy reviewing',
    example: 'git config --global color.ui auto',
    category: 'setup',
  },
  {
    command: 'git init',
    desc: 'Initialize an existing directory as a Git repository',
    example: 'git init',
    category: 'setup',
  },
  {
    command: 'git clone [url]',
    desc: 'Retrieve an entire repository from a hosted location via URL',
    example: 'git clone https://github.com/user/repo.git',
    category: 'setup',
  },

  // BRANCH & MERGE
  {
    command: 'git branch',
    desc: 'List your branches. A * appears next to the active branch',
    example: 'git branch',
    category: 'branch',
  },
  {
    command: 'git branch [branch-name]',
    desc: 'Create a new branch at the current commit',
    example: 'git branch feature-login',
    category: 'branch',
  },
  {
    command: 'git checkout [branch]',
    desc: 'Switch to another branch and check it out into your working directory',
    example: 'git checkout main',
    category: 'branch',
  },
  {
    command: 'git merge [branch]',
    desc: 'Merge the specified branch\'s history into the current one',
    example: 'git merge feature-login',
    category: 'branch',
  },
  {
    command: 'git log',
    desc: 'Show all commits in the current branch\'s history',
    example: 'git log --oneline',
    category: 'branch',
  },

  // SHARE & UPDATE
  {
    command: 'git remote add [alias] [url]',
    desc: 'Add a Git URL as an alias',
    example: 'git remote add origin https://github.com/user/repo.git',
    category: 'share',
  },
  {
    command: 'git fetch [alias]',
    desc: 'Fetch down all the branches from that Git remote',
    example: 'git fetch origin',
    category: 'share',
  },
  {
    command: 'git merge [alias]/[branch]',
    desc: 'Merge a remote branch into your current branch to bring it up to date',
    example: 'git merge origin/main',
    category: 'share',
  },
  {
    command: 'git push [alias] [branch]',
    desc: 'Transmit local branch commits to the remote repository branch',
    example: 'git push origin main',
    category: 'share',
  },
  {
    command: 'git pull',
    desc: 'Fetch and merge any commits from the tracking remote branch',
    example: 'git pull origin main',
    category: 'share',
  },

  // TRACK PATH CHANGES
  {
    command: 'git rm [file]',
    desc: 'Delete the file from project and stage the removal for commit',
    example: 'git rm old-file.js',
    category: 'track',
  },
  {
    command: 'git mv [existing-path] [new-path]',
    desc: 'Change an existing file path and stage the move',
    example: 'git mv old.js new.js',
    category: 'track',
  },
  {
    command: 'git log --stat -M',
    desc: 'Show all commit logs with indication of any paths that moved',
    example: 'git log --stat -M',
    category: 'track',
  },

  // TEMPORARY COMMITS
  {
    command: 'git stash',
    desc: 'Save modified and staged changes temporarily',
    example: 'git stash',
    category: 'temp',
  },
  {
    command: 'git stash list',
    desc: 'List stack-order of stashed file changes',
    example: 'git stash list',
    category: 'temp',
  },
  {
    command: 'git stash pop',
    desc: 'Write working from top of stash stack',
    example: 'git stash pop',
    category: 'temp',
  },
  {
    command: 'git stash drop',
    desc: 'Discard the changes from top of stash stack',
    example: 'git stash drop',
    category: 'temp',
  },

  // REWRITE HISTORY
  {
    command: 'git rebase [branch]',
    desc: 'Apply any commits of current branch ahead of specified one',
    example: 'git rebase main',
    category: 'rewrite',
  },
  {
    command: 'git reset --hard [commit]',
    desc: 'Clear staging area, rewrite working tree from specified commit',
    example: 'git reset --hard HEAD~1',
    category: 'rewrite',
  },

  // INSPECT & COMPARE
  {
    command: 'git log',
    desc: 'Show the commit history for the currently active branch',
    example: 'git log',
    category: 'inspect',
  },
  {
    command: 'git log branchB..branchA',
    desc: 'Show the commits on branchA that are not on branchB',
    example: 'git log main..feature',
    category: 'inspect',
  },
  {
    command: 'git log --follow [file]',
    desc: 'Show the commits that changed file, even across renames',
    example: 'git log --follow index.js',
    category: 'inspect',
  },
  {
    command: 'git diff branchB...branchA',
    desc: 'Show the diff of what is in branchA that is not in branchB',
    example: 'git diff main...feature',
    category: 'inspect',
  },
  {
    command: 'git show [SHA]',
    desc: 'Show any object in Git in human-readable format',
    example: 'git show a1b2c3d',
    category: 'inspect',
  },

  // IGNORING PATTERNS
  {
    command: '.gitignore',
    desc: 'Save file with patterns to prevent unintentional staging of files',
    example: 'node_modules/\n.env\n*.log\nbuild/',
    category: 'ignore',
  },
  {
    command: 'git config --global core.excludesfile [file]',
    desc: 'System wide ignore pattern for all local repositories',
    example: 'git config --global core.excludesfile ~/.gitignore_global',
    category: 'ignore',
  },
];

# Dr Denver

## What Mikey Did

1. Download the drdenver folder from the cloud 9 account
2. Extract zipped folder into a directory on my host machine
3. Initialized git repository with
  * `git init`
4. Add the remote with
  * `git remote add origin https://github.com/mbssx/DrDenver.git`
5. Added a gitignore
  * `touch .gitignore`
6. Added the line to the gitignore for node_modules      
  * `*node_modules*`
7. Added all the changed files (note everything is changed since it is a new repo)
  * `git add --all`
8. Committed the files
  * `git commit -m "Initial commit"`
9. Pushed the files
  * `git push -u origin master`

Notes here:
 * What is master?
   * Master is a branch name, you could have picked any branch name, but master is the "default"
 * What is a remote?
   * A remote is a reference to a git repository. You can have multiple remotes on a repository but typically you just have "origin" (again a standard default)
 * What is a commit?
   * A commit is like a "step" for your code base. Steps should be atomic, stable and testable. But most importantly, there must be a clear set of steps from A -> B. There is a lot of research and detail into the question of "What is a good commit?"
 * What is a push?
   * A push takes a series of commits and applies them to the repository. Pushes should be infrequent and only occur when a series of steps has led you to a milestone
 * What is a gitignore?
   * A .gitignore file is set at the top level of the repository and basically tells git what types of files to ignore
 * How did you make this document appear?
   * Again, a special file called a README.md will be automatically displayed by default in a repository

Further readings on GIT and Version Control
 * https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control

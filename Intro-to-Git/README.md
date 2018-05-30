# Introduction to Git / GitHub

# What is Git?

Git is a distributed version control system (dvcs). A version control system is an application that allows programmers to manage changes to their projects over time. Here, the word distributed means that there is no central server where a project's source code and history live.

When cloning a Git project (making a copy on your local machine), you get a copy of the repository in it's current state and all of it's history going back to the very first commit.

Having the entire project stored locally on your computer makes for extremely fast operations on the repository because it doesn't have to communicate with a central server.


# Why Should I Use Git?

If you are the only one working on your project, you may ask yourself, "Why even bother with version control?". You may have a project that you have been working on where you take regular backups at points where your code has changed significantly.

One day you decide to start working on a new feature. You implement the feature and take a backup of the project. The next day you decide that the feature you just implemented isn't going to work out, so you remove it. You continue working on the project for several weeks, taking regular backups along the way. At some point you decide that the project is in a stable state and decide to remove the old backups that you created. Later, you remember the feature that you had worked on weeks previously and decide to give it a second chance. The problem, however, is that you've already removed the old backups from the project. Even if you had kept them, would you even be able to remember which backup it was that contained the feature that you had built and then abandoned?

This problem can be exponentially exacerbated when more people work on the project. It is inevitable that, at some point, someone will delete or overwrite a file that you may have been working on. Maybe you've been sending copies of the code back and forth to each other via email and you can use that to go and find an old backup of the codebase that has the feature you just lost. Best of luck.

These scenarios, and many others like them, are exactly the types of problems that using a version control system help us to solve or avoid altogether.


# Enter Git

The first step to using Git is to download and install it. If you are working on a Linux system, odds are that you already have Git. If not, however, it is typically available via your package manager by the name of `git` or `git-core`. If you are working on a Mac or Windows system, you can download Git from [git-scm](https://www.git-scm.com).

While GUI applications for working with Git abound, the most efficient way of working with Git is from the command line. If you aren't familiar with, or are intimidated by the command line, don't worry, this will be a gentle introduction.

If the CLI isn't your thing, or you are interested in working with Git in a GUI environment, check out some of these desktop clients:

- [GitKraken](https://www.gitkraken.com/) - *Linux, Mac, Windows*
- [Sourcetree](https://www.sourcetreeapp.com/) - *Mac, Windows*
- [GitHub Desktop](https://desktop.github.com/) - *Mac, Windows*
- [Tortoise Git](https://tortoisegit.org/download/) - *Windows*


# Getting Started

Once you have installed Git, the first thing you should do is add your name and email to Git's global configuration file. This information will be added to each commit that you make and make it easier to figure out who has created a particular commit when viewing the log.

```bash
$ git config --global user.name  "<first> <last>"
$ git config --global user.email "<email address>"
```

After configuring your name and email, use the terminal to navigate to, or create, the directory where you would like to store you Git repositories. This can be in your home folder, documents, or wherever you like.


## Create a new repository

Once you are inside of the folder where you will store your repositories, create a folder for your new repository and enter it, then create a new Git repository using the `git init` command.

```bash
$ mkdir my-project
$ cd my-project

$ git init
# Initialized empty Git repository in /Users/brycejech/Documents/GitHub/my-project/.git/
```

The `git init` command from above will initialize a new repository in the current directory. You can optionally specify the directory in which to create the new repository; when not specified, git uses the current working directory. After running the `git init` command, use the `ls -a` command to see the contents of the directory. You should see a new `.git` folder.

```bash
$ ls -a
# .	..	.git
```

The .git folder contains all of the information about your repository, it's history, object database, settings, and much more. Diving into this folder is outside of the scope of this talk, but if you would like to read more you can do so [here](http://gitready.com/advanced/2009/03/23/whats-inside-your-git-directory.html).

## Git Workflow

Before we dive in, it's important to learn about the different states that files can be in when working with Git. These states are `committed`, `modified`, and `staged`.

- `committed` means that the changes have been safely added to your local database.
- `modified` means that a file has been changed, but not yet added to the staging area.
- `staged` means that you have marked a modified file in its current state to go into your next commit.

These states are related to the three main areas of a Git project. The .git directory, the working tree, and the staging area (or index).

- The .git directory, as described earlier, is where Git stores the object database and all of the metadata about your project. This is the most important part of Git, without this folder, you don't have a Git project.
- The working tree is a checkout of one version of the project. In our case, this is a checkout of the `master` branch. This is your working directory where your projects current state lives.
- The staging area, or, more accurately, the index, is a file located in your .git directory. It stores information about what will go into your next commit.

The most basic Git workflow is as follows:

1. You make some changes to files in your working tree.
2. Using the `git add` command, you selectively stage the changes you want to be a part of your next commit. It is important to note that Git adds *only* those changes to the staging area.
3. You make a commit which takes the files as they are in the staging area and stores a snapshot to your Git directory.


## Git Status

Before we start making commits, let's use the `git status` command to view the current state of the repository.

```bash
$ git status

# On branch master

# No commits yet

# nothing to commit (create/copy files and use "git add" to track)
```

Git reports back to us that we are currently on the `master` branch (more on branches later), we haven't made any commits yet, and that we haven't `add`ed any files to commit yet.


## Making Commits

Now that we're all set up, let's create a file so that we can make our first commit.

```bash
$ echo 'Today I am learning about Git!' > index.txt
```

This will create a file named `index.txt` with the contents `Today I am learning about Git!`.

Let's do another status check.

```bash
$ git status
# On branch master

# No commits yet

# Untracked files:
#   (use "git add <file>..." to include in what will be committed)

# 	index.txt

# nothing added to commit but untracked files present (use "git add" to track)
```

Here, Git is telling us that we have an untracked file, `index.txt` and that we need to `add` it to the staging area before we can commit it.

Let's `add` the file to the staging area and do another status check.

```bash
$ git add index.txt

$ git status
# On branch master

# No commits yet

# Changes to be committed:
#   (use "git rm --cached <file>..." to unstage)

# 	new file:   index.txt
```

Git now reports that the file has been added to staging and will be part of our next commit.

*Here, we've specified a single file with the `git add` command. Note that you can specify multiple files or directories when using `add`.*

It's also important to note that the `add` command adds your changes to the staging **as they are**. Any further modifications to the file(s) will not be added to the next commit unless you explicitly add them back in. You could, in some cases, have the same file appear in the untracked changes section as well as the changes to be committed section. If it helps, think of the `add` command like saying, "add precisely these changes to the next commit", rather than adding a file or folder to the next commit.

Now, let's make our first commit and do yet another status check.

```bash
$ git commit -m 'add index.txt'
# [master (root-commit) 3b58485] add index.txt
#  1 file changed, 1 insertion(+)
#  create mode 100644 index.txt

$ git status
# On branch master
# nothing to commit, working tree clean
```

When using the `git commit` command above, note that we've given it an `-m` option. Here, `-m` stands for message. The string of text passed to the command after the `-m` flag will become our commit message.

All of your commits should not only have messages, but the messages should describe the change that occurred in that particular commit. Giving good, descriptive commit messages will save you lots of debugging time in the future. It will make it much easier to track down commits that may have introduced bugs or that you are otherwise trying to locate.

Commit messages should be short and concise. If you need to specify more explanatory text, you can pass multiple `-m` flags. The first message passed will be the commit message itself, and any additional messages passed will appear on separate lines when viewing the `git log` for the project.

When making the commit above, Git reports some information about the commit back to us. It gives us the branch name that the commit was made on, the hash, the commit message, and some data about what was changed.

After making the commit, when doing another status check, Git reports back that we are on our `master` branch, that there is nothing to commit, and that our working tree is clean.

### Bypassing the Staging Area

The staging area is very helpful in that allows us to carefully craft out commit messages and include changes/files selectively. However, sometimes it may be a bit more complex than we need for our workflow.

We can by bypass the staging area by including the `-a` flag with the `git commit` command. Using the `-a` flag will stage all changes to files that were already being tracked before making the commit.

```bash
$ git commit -a -m '<your commit message>'
```

Take special care when using the `-a` option however, as files that have not previously been `add`ed are not included.


## Removing Files

To remove a file from a Git project, you have to explicitly remove it from your staging area and then commit. To do this, you can use the `git rm <file>` command. This will remove the file(s) from your filesystem and stage it's removal for the next commit.

```bash
$ echo 'I'\''am about to be removed!' > remove.txt
$ git add remove.txt
$ git commit -m 'add remove.txt'

# [master d7fa17a] add remove.txt
#  1 file changed, 1 insertion(+)
#  create mode 100644 remove.txt

$ git rm remove.txt
# rm 'remove.txt'

$ git commit -m 'rm remove.txt'
```

Note that the `git rm <file>` command is equivalent to removing the file and `add`ing it's removal to the staging area like so:

```bash
$ rm remove.txt
$ git add remove.txt
$ git commit -m 'rm remove.txt'
```

So, the `git rm` command just does a couple extra steps for us.

There may also be scenarios where you want to remove a file from the staging area, but keep it on your hard drive. You can pass it the `--cached` option to accomplish this.

```bash
$ git rm --cached remove.txt
$ git commit -m 'rm remove.txt'
```

The above would remove the file from staging and commit it's removal, but would not touch the file in your working tree. This is particularly useful for scenarios where you forgot to add a file to your .gitignore and accidentally staged it.

## Moving Files

While Git doesn't actually store any metadata about file movement, it is good at figuring out if a file has been moved after the fact.

Git comes with a `mv` command for moving, or renaming, files. Similarly to the `git rm` command, it does a couple operations for us. `git mv <from> <to>` will move the `<from>` file to the `<to>` file, and stage the changes.

```bash
$ echo 'I'\''m about to be moved!' > move.txt
$ git add move.txt
$ git commit -m 'add move.txt'
# [master c98471a] add move.txt
#  1 file changed, 1 insertion(+)
#  create mode 100644 move.txt

$ git mv move.txt moved.txt

$ git status

# On branch master
# Changes to be committed:
#   (use "git reset HEAD <file>..." to unstage)

# 	  renamed:    move.txt -> moved.txt

$ git commit -m 'rename move.txt to moved.txt'
```

As you can see from the output in the changes to be committed section, Git has detected that the `move.txt` file has been renamed to `moved.txt`.

Note that the `git mv move.txt moved.txt` command from above is equivalent to renaming the file, staging the removal, and adding the new file

```bash
$ mv move.txt moved.txt
$ git rm move.txt
$ git add moved.txt
```

## Viewing Project History

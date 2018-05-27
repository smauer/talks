# Introduction to Git / GitHub

## What is Git?

Git is a distributed version control system (dvcs). A version control system is an application that allows programmers to manage changes to their projects over time. Here, the word distributed means that there is no central server where a project's source code and history live.

When cloning a Git project (making a copy on your local machine), you get a copy of the repository in it's current state and all of it's history going back to the very first commit.

Having the entire project stored locally on your computer makes for extremely fast operations on the repository because it doesn't have to communicate with a central server.


## Why Should I Use Git?

If you are the only one working on your project, you may ask yourself, "Why even bother with version control?". You may have a project that you have been working on where you take regular backups at points where your code has changed significantly.

One day you decide to start working on a new feature. You implement the feature and take a backup of the project. The next day you decide that the feature you just implemented isn't going to work out, so you remove it. You continue working on the project for several weeks, taking regular backups along the way. At some point you decide that the project is in a stable state and decide to remove the old backups that you created. Later, you remember the feature that you had worked on weeks previously and decide to give it a second chance. The problem, however, is that you've already removed the old backups from the project. Even if you had kept them, would you even be able to remember which backup it was that contained the feature that you had built and then abandoned?

This problem can be exponentially exacerbated when more people work on the project. It is inevitable that, at some point, someone will delete or overwrite a file that you may have been working on. Maybe you've been sending copies of the code back and forth to each other via email and you can use that to go and find an old backup of the codebase that has the feature you just lost. Best of luck.

These scenarios, and many others like them, are exactly the types of problems that using a version control system help us to solve or avoid altogether.


## Enter Git

The first step to using Git is to download and install it. If you are working on a Linux system, odds are that you already have Git. If not, however, it is typically available via your package manager by the name of `git` or `git-core`. If you are working on a Mac or Windows system, you can download Git from [git-scm](https://www.git-scm.com).

While GUI applications for working with Git abound, the most efficient way of working with Git is from the command line. If you aren't familiar with, or are intimidated by the command line, don't worry, this will be a gentle introduction.

If the CLI isn't your thing, or you are interested in working with Git in a GUI environment, check out some of these desktop clients:

- [GitKraken](https://www.gitkraken.com/) - *Linux, Mac, Windows*
- [Sourcetree](https://www.sourcetreeapp.com/) - *Mac, Windows*
- [GitHub Desktop](https://desktop.github.com/) - *Mac, Windows*
- [Tortoise Git](https://tortoisegit.org/download/) - *Windows*


## Getting Started

Once you have installed Git, the first thing you should do is add your name and email to Git's global configuration file. This information will be added to each commit that you make and make it easier to figure out who has created a particular commit when viewing the log.

```bash
git config --global user.name  "<first> <last>"
git config --global user.email "<email address>"
```

After configuring your name and email, use the terminal to navigate to, or create, the directory where you would like to store you Git repositories. This can be in your home folder, documents, or wherever you like.

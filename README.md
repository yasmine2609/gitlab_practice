# Practice for Github Session 2

This project is a simple web calculator, use it to practice Github collaboration, testing and actions.

- front-end: [view.html](src/view.html)
- controller: [calculator.js](src/calculator.js)
- unit tests: [claculator.test.js](test/calculator.test.js)
- actions template: [CI_CD_STARTED.txt](CI_CD_STARTED.txt)

# Setup:
## install node.js if not installed yet:
- download from: [nodejs website](https://nodejs.org/)
- verify that it is installed correctly:

> run in your terminal

```bash
node -v
npm -v
```
you should see something like:

![0](imgs/npm_working.png)

## 1. Download the zip from this repo

![0](imgs/download_zip.png)

uzip the file:

![0](imgs/unzip.png) ![0](imgs/unzip2.png)

## 2. Open new window on VsCode

![0](imgs/open_new_window.png)

Open the unzipped folder on VsCode

![0](imgs/open_folder_vscode.png)

Open terminal (Ctrl+J)

> you should see your folder open on the left side like in the image

![0](imgs/open_terminal.png) 

Open Git bash:

![0](imgs/open_git_bash.png) 

> you should see that you are located in the github_practive_master folder

![0](imgs/git_bash.png)  


## 3. create a repote Github repo

got to: Repositories > [new](https://github.com/new) and create a **public** repository.

![0](imgs/create_new_repo.png)

> make sure your repo is public with no readme file or template

![0](imgs/public_repo.png)

## 4. **innitialize** the repo, **add** all the files and commit

> run in git bash

```bash
git init
git add .
git commit -m "innitial commit"
```

> you should see all the commands runing

![0](imgs/repo_init.png)

## 5. connect remote repo with local repo

run the commands provided by **Github** when you created a new repo:

![0](imgs/connect_remote_repo.png)

> if your branch name is "master" intead of "main", make sure to always change the branch name when needed in this practice

![0](imgs/branch_name.png)


# Practice 1: GitHub Collaboration
## Part 1: Add Collaborators

1. **Invite your teammates** as repository collaborators (Team of 2 to 3).

![1](imgs/invite_collaborators.png)

2. Ask each collaborator to **clone the repository**.

```bash
git clone <your repo url>
```

## Part 2: Protect Main Branch

1. Open your repository's **Settings** → **Rules** → **Rulesets**

![1](imgs/rulset_page.png)

3. Create a rule for the **main branch**, make sure to toggle: 
- **Require pull requests** before merging changes.
- **Require approvals** of **1** and passing status checks before merging.

![1](imgs/pritect_main.png) ![1](imgs/add_main_branch.png) ![1](imgs/branches_added.png) ![1](imgs/restrict_pull_request.png) 

## Part 3: Open a Pull Requests

1. Create a **new branch**:
```bash
git checkout -b feature
```
2. Make a **change**: add you name in the [view.html](src/view.html) file.
3. **Stage** and **commit** your changes:
```bash
   git add .
   git commit -m "UI: added name to view"
```
4. **Push** your branch:
```bash
   git push -u origin feature
```
5. Open a **pull request** on GitHub: Describe the change and explain how you tested it.

![1](imgs/open_pull_request.png) 

## Part 4: Review the Pull Request
1. Assign another student to **review your pull request**.
2. **Review** the code changes.

![1](imgs/review_code.png)

3. Leave a **comment** or suggest an improvement.

![1](imgs/pull_request_view.png)

4. **Approve** the pull request.

![1](imgs/approve_pull_request.png)

5. **Merge the pull request** after the required checks pass.

## Part 6: Resolve Conflicts
1. Modify the **same line** in separate branches.
2. **Merge the first** branch.
```bash
git checkout main
git pull origin main
git checkout feature/my-change
git merge main
```
3. **Update the second branch** with the latest changes from main.
4. **Resolve the conflict** in your editor.
5. **Commit** the resolution and complete the pull request.
```bash
git add .
git commit -m "fix: resolve merge conflict"
git push
```

# Practice 2: GitHub Automation
## Part 1: Unit testing
### 1. create a package.json file:

> run this command in your terminal **(not in git bash)**

```bash
npm init -y
```

> The npm init command is used to initialize a new Node.js project by generating a package.json

![2](imgs/run_npm_init.png)

you should see:

```bash
Wrote to github_practice\package.json:

{
  "name": "github_practice",
  "version": "1.0.0",
  "description": "",
  "main": "calculator.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs"
}
```

### 2. Update the package.json file:

change [package.json](package.json) to add **"scripts": {"test": "jest"},**

```bash
{
  "name": "github_practice",
  "version": "1.0.0",
  "description": "",
  "main": "calculator.js",
  "scripts": {
    "test": "jest"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs"
}
```
> save the changes (ctrl+s)

![2](imgs/update_json.png)

### 3. install jest:

> run in you terminal **(not git bash)**

```bash
npm install --save-dev jest
```

![2](imgs/install_jest.png)

you should see:
```bash
added 278 packages, and audited 279 packages in 25s
```
and have [package-lock.json](package-lock.json) and [node_modules](node_modules) created on the root, like this:
``` text
github_practice/
├── imgs/
├── node_modules/
├── src/
├── test/
├── .gitignore
├── CI_CD_STARTER.txt
├── package-lock.json
├── package.json
└── README.md
```

### 4. run unit tests:

> run in terminal **(not in git bash)**

```bash
npm test
```

> you should see all test passed in green

![2](imgs/npm_test.png)


## Part 3: Continus Integration

1. create a [CI.yaml](.github/wordkflow/CI.yml) file in the root of the folder inside .github/workflows:

> this is where github can see the ations you want to automate

``` text
github_practice/
├── .github/
    └── workflows/
        └── CI.yml
```

![2](imgs/create_CI.png)

> if your brache name is **'master'**, replace **'main'** with **'master'**

copy this into the file:
``` yaml
name: Calculator CI

on:
  push:
    branches:
      - main # or master

  pull_request:
    branches:
      - main # or master

  workflow_dispatch:

permissions:
  contents: read

jobs:
  test:
    name: Run Unit Tests
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Run Jest tests
        run: npm test
```

![2](imgs/CI_file.png)

2. commit and push you code:

> run this on git bash (replace main with master if your branch name is master)

```bash
git add .
git commit -m "CI: trigger workflow on main" # or master
git push origin main # or master
```

3. Confirm that the CI workflow passes.

![1](imgs/CI_pass_check.png) ![2](imgs/CI_pass_check2.png)

> if the test does not pass try npm upgarde and push again, or verify that your main branch name is correct (can be main or master) 

## Part 4: Continus Deployement
1. create a [CD.yaml](.github/wordkflow/CD.yml) file in the root of the folder inside .github/workflows:
``` text
github_practice/
├── .github/
    └── workflows/
        ├── CI.yml
        └── CD.yml
```

![2](imgs/create_CD.png)

> if your brache name is **'master'**, replace **'main'** with **'master'**

copy this into the file:
```yml
name: Calculator CD

on:
  push:
    branches:
      - main # or master

  workflow_dispatch:

permissions:
  contents: read

jobs:
  deploy:
    name: Deploy to GitHub Pages
    runs-on: ubuntu-latest

    permissions:
      contents: read
      pages: write
      id-token: write

    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Configure GitHub Pages
        uses: actions/configure-pages@v5

      - name: Prepare website files
        run: |
          mkdir public
          cp src/view.html public/index.html
          cp src/calculator.js public/calculator.js

      - name: Upload website artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: public

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

![2](imgs/CD_file.png)

2. Enable GitHub Pages in the repository settings.

![3](imgs/enable_github_page.png)

3. commit and push you code
```bash
git add .
git commit -m "CD: trigger deployment on main" # or master
git push origin main # or master
```
4. Confirm that the CD workflow passes.

![4](imgs/CD_pass_check.png) 
![5](imgs/CD_pass_check2.png)

6. Open the published website and test the calculator.

> the url is: [your github username].github.io/[your repo name]

![5](imgs/CD_pass_check3.png)

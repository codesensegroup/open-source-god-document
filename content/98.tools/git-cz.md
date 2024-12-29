---
title: Git-cz
pageTitle: Git-cz
contributors:
  - yonger0718
---

> 這篇文章應該要做為開發的起手式，目的是為了打造出一個整潔的Git環境，使用簡單的工具讓大家快速上手Git Message的撰寫，不用再被reject pull request所苦惱。

這次我們所選用的輔助工具為：[git-cz](https://github.com/streamich/git-cz)
> requirements: `Node.js >= v12.20.0`

::alert{type="danger"} 
@samuikaze: 工具的使用並非絕對的需求，重點是要培養一個良好的習慣，把每個 Commit Message 都按照[規則](#Rules)寫好才是最重要的。
::

## Prerequisite

使用這個工具之前，最起碼得先了解 `Git` 的用途和基礎的指令，如果還不熟悉的話，這邊推薦兩個方式來進行學習: 

1. [高見龍 - Gitbook](https://gitbook.tw/): 往底下找有一些相關的素材可以使用，如果有興趣的話也推薦他的書籍! 
2. [Learn Git Branching](https://learngitbranching.js.org/?locale=zh_TW): 讓你以實際的操作，並透過遊玩的方式來進行學習。

## Introduction

`Git-cz` 是一款工具，用於生成語義化的 `Git` 提交訊息，能提升提交訊息的規範性與一致性。本文件旨在指導如何安裝、配置及使用 `Git-cz`，並結合最佳實踐提升團隊效率。

**主要功能：**

- **互動式提交流程：** git-cz 提供一個引導式的提交過程，提示使用者選擇提交類型（如功能、新增、修復等），並填寫相關描述，確保提交訊息的一致性和可讀性。
- **自訂配置：** 使用者可以在專案目錄中創建 `changelog.config.js` 檔案，定義自訂的提交類型、訊息格式、可選範圍等，以滿足專案的特定需求。(於 [Customization](#Customization) 段落提及)

::callout
#summary 
一句話描述 `git-cz` 的功能
#content 
能夠以一致的格式產出基本的git message，也提供自定義的格式提供設定。
::
## Installation

### nvm(optional, but recommended)

::alert{type="success"} 
這個並沒有強制性的安裝需求，若是有對 `Node.js` 版控的需求者才必需使用。
::

#### Windows:

從 [nvm-windows 的 GitHub 頁面](https://github.com/coreybutler/nvm-windows) 找到最新的release，並下載最新的安裝程式，按照指示完成安裝。

#### Others:

透過 `curl` 或是 `wget` 的方式進行下載並安裝。
> 請注意，中間的版本號 `v0.40.1` 隨時有更新的可能，可以到[nvm的repo](https://github.com/nvm-sh/nvm)進行確認。

::code-group
  ```bash [curl]
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
  ```
  ```bash [wget]
  wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
  ```
::

安裝完成後可以在 `Terminal` 上空敲 `nvm` 看到所有 `nvm` 的指令集，紅框中的內容是一般常用指令，包含 `install`, `list`, `uninstall` 和 `use`。

![image.png](https://i.imgur.com/s3bTCEU.png)

#### nvm-functions

- 安裝

```bash
nvm install <版本號> [arch]

# 預設抓取LTS
nvm install 20

# 有v無v皆可
nvm install v20

# 安裝指定版本
nvm install 20.18.1

# 指定架構/指令集，預設64bit，可選[32|64|arm64]
nvm install 20.18.1 64
```

- 使用/切換

```bash
#查看目前已安裝版本
nvm list

#切換至特定版本號，規則同安裝的規則
#若同時有多個一樣開頭時，則會透過模糊比對，選擇版本號最大的來進行使用
#ex: 18.1/18.2，只選擇use 18，會選用18.2
nvm use <版本號> 

nvm use 20
```

- 移除

```bash
#移除時需要指定詳細的版本號，無法模糊比對
nvm uninstall <版本號>

nvm uninstall 18.20.5
```


### Node.js

#### nvm(recommended)

::alert{type="info"} 
所有的系統都建議採用這套分案進行，請參考 [nvm usage](#nvm-functions)。
::

#### Windows

只推薦透過以下兩種方式進行：

1. 直接到 [Node.js 官方網站](https://nodejs.org/zh-tw/download/prebuilt-installer)選定版本進行下載(.msi檔)、安裝，原則上安裝過程全程下一步即可。
2. 使用 `chocolatey` 套件管理器進行安裝，在 [Node.js 官方網站](https://nodejs.org/zh-tw/download/package-manager)上也有詳細的步驟可以直接到 `PowerShell` 上直接執行。

#### macOS

1. 透過 `homebrew` 這個套件管理器進行安裝，[官方網站](https://nodejs.org/zh-tw/download)上亦有對應的安裝教學。

```bash
# 安裝homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 下載並安裝 Node.js
# 版本可以自己指定在 @ 後頭
brew install node@20

# 進行驗證
node -v
npm -v
```

2. 官方安裝檔: [官方網站](https://nodejs.org/zh-tw/download)上可以選取 `macOS` 對應的 `.pkg` 安裝包進行安裝，安裝的流程可以參考 [這篇文章](https://medium.com/@1chooo/%E5%A6%82%E4%BD%95%E5%9C%A8-mac-%E5%AE%89%E8%A3%9D-node-js-npm-3d7101d998f4)。

#### Linux
> 這邊的案例以Ubuntu為主

1. 透過 `apt` 等內建管理工具直接安裝(不推薦，版本沒再更新也無法特別指定)

```bash
# 先更新 apt
sudo apt update

# 安裝node.js, npm，需要個別安裝
sudo apt install -y nodejs npm

# 進行驗證
node -v
npm -v
```

2. 使用 [NodeSource](https://nodesource.com/) 提供的分支進行方裝，也可以參考 [官方的文件](https://github.com/nodesource/distributions) 來進行

::alert{type="warning"} 
請注意，根據 [官方文件](https://github.com/nodesource/distributions) 的描述，當前原則上僅支援 Node 18+ 的版本，同時 Ubuntu 18.04、Debian 8 & 9、Fedora 20~28、RH7、Amazon Linux 2 等 Distrubution 尚不支援。
::
```bash
# 如果沒有curl，先進行安裝
sudo apt install -y curl

# 下載安裝script，可以指定詳細版本，若不指定則預設當前版本下的最新版
# 如果把 _版本 給移除留下 setup.x，便會安裝當前最新的release
curl -fsSL https://deb.nodesource.com/setup_20.x -o nodesource_setup.sh

# 執行腳本，需要權限
sudo -E bash nodesource_setup.sh

# 進行安裝
sudo apt install -y nodejs

# 進行驗證
node -v
```

### git-cz

安裝完成 `Node.js` 和 `npm` 後開啟cli，執行:

```bash
# 全域安裝(建議)
npm install -g git-cz

# 專案安裝
npm install --save-dev git-cz
```

## Usage

### Normal usecase

當你需要提交新的 `commit` 時

```bash
# 先進行紀錄的添加才能夠進行commit
git add .

# 最簡單直白的使用 git-cz
git-cz

# 使用 git-cz，但移除表情符號
git-cz --disable-emoji
```

需要輸入的內容: 
1. 類型: 選擇 commit 的類型，如功能性的變化、bug的修復等，選項包含: 
	- `feat`: 新功能
	- `fix`: 修正錯誤
	- `docs`: 文件修改
	- `style`: 格式修改，不影響程式碼的意義
	- `refactor`: 重構程式碼
	- `test`: 增加測試
	- `chore`: 雜事，例如安裝依賴
	- `ci`: 持續整合相關的修改
	- `pref`: 效能優化
2. 範圍(目前使用這方式無法指定): 可以填寫API等自定義內容，選填。
3. 主旨: 描述主要提交的目的，**限制60字元**。
4. 詳細訊息: 選填，填入更詳細的相關資訊。
5. 重大變更: 如果有重大的變更(無法向下支援)則需要詳細記錄。
6. issue close: 填入相關已知可以被這次改動關閉的 `issue`。

#### 案例: 修正後端 API 錯誤
> 雖然這個範例是使用中文完成的，但原則上還是推薦可以的話 commit message 盡可能地使用英文來完成會比較好

執行 `git-cz`，選擇以下內容：

- **類型**：`fix`
- **範圍**：`API`
- **提交訊息**：修正無法正確回應的錯誤
- **詳細訊息**：修正了在某些情境下後端 API 無法正確回應 200 狀態的問題。
- **關聯問題認證碼**：`#456`

生成的commit message：

```
fix(API): 修正無法正確回應的錯誤

修正了在某些情境下後端 API 無法正確回應 200 狀態的問題。

關聯問題：#456
```

實際 key-in:
![image.png](https://i.imgur.com/qU8KzoG.png)


### Non-interactive

使用 `cli` 的方式直接完成添加
```bash
git-cz --non-interactive --type=feat --subject="add onClick prop to component"
```

可以使用的選項:
- `--type`: 類型
- `--subject`: 主旨
- `--scope`: 範圍
- `--body`: 內容
- `--breaking`: 重大變更
- `--issues`: 關閉issue
- `--lerna`: `lernajs` 下會使用到的參數，可以不使用

## Customization

`git-cz` 是提供客製化選項的，可以直接參考 [這篇文章](https://israynotarray.com/git/20221115/721294310/) 進行。

::alert{type="info"} 
預設官方提供的 `changelog.config.js`，可以在 當前專案的根目錄或是任何parent folder 中直接新增並修改內容，`git-cz` 便會自動套用格式。
::
```js
module.exports = {
  disableEmoji: false,
  format: '{type}{scope}: {emoji}{subject}',
  list: ['test', 'feat', 'fix', 'chore', 'docs', 'refactor', 'style', 'ci', 'perf'],
  maxMessageLength: 64,
  minMessageLength: 3,
  questions: ['type', 'scope', 'subject', 'body', 'breaking', 'issues', 'lerna'],
  scopes: [],
  types: {
    chore: {
      description: 'Build process or auxiliary tool changes',
      emoji: '🤖',
      value: 'chore'
    },
    ci: {
      description: 'CI related changes',
      emoji: '🎡',
      value: 'ci'
    },
    docs: {
      description: 'Documentation only changes',
      emoji: '✏️',
      value: 'docs'
    },
    feat: {
      description: 'A new feature',
      emoji: '🎸',
      value: 'feat'
    },
    fix: {
      description: 'A bug fix',
      emoji: '🐛',
      value: 'fix'
    },
    perf: {
      description: 'A code change that improves performance',
      emoji: '⚡️',
      value: 'perf'
    },
    refactor: {
      description: 'A code change that neither fixes a bug or adds a feature',
      emoji: '💡',
      value: 'refactor'
    },
    release: {
      description: 'Create a release commit',
      emoji: '🏹',
      value: 'release'
    },
    style: {
      description: 'Markup, white-space, formatting, missing semi-colons...',
      emoji: '💄',
      value: 'style'
    },
    test: {
      description: 'Adding missing tests',
      emoji: '💍',
      value: 'test'
    },
    messages: {
      type: 'Select the type of change that you\'re committing:',
      customScope: 'Select the scope this component affects:',
      subject: 'Write a short, imperative mood description of the change:\n',
      body: 'Provide a longer description of the change:\n ',
      breaking: 'List any breaking changes:\n',
      footer: 'Issues this commit closes, e.g #123:',
      confirmCommit: 'The packages that this commit has affected\n',
    },
  }
};
```

例如要修改成中文的版本，修改後的版本:
```js
module.exports = {
  disableEmoji: false, // 是否禁用 emoji
  format: '{type}{scope}: {emoji}{subject}', // Commit 訊息的格式
  list: ['test', 'feat', 'fix', 'chore', 'docs', 'refactor', 'style', 'ci', 'perf'], // Commit 類型的清單
  maxMessageLength: 64, // Commit 訊息的最大長度
  minMessageLength: 3, // Commit 訊息的最小長度
  questions: ['type', 'scope', 'subject', 'body', 'breaking', 'issues', 'lerna'], // 問題的清單
  scopes: [], // Commit 範圍的清單
  types: { // Commit 類型的清單
    chore: {
      description: '增加或修改第三方套件(輔助工具)等 (maintain)', // Commit 類型的描述
      emoji: '🤖', // Commit 類型的 emoji
      value: 'chore' // Commit 類型的值
    },
    ci: {
      description: 'CI 相關更動(Continuous Integration)',
      emoji: '🎡',
      value: 'ci'
    },
    docs: {
      description: '修改/新增文件 (documentation)',
      emoji: '✏️',
      value: 'docs'
    },
    feat: {
      description: '新增/修改功能 (Feature)',
      emoji: '🎸',
      value: 'feat'
    },
    fix: {
      description: '修正 Bug (bug fix)',
      emoji: '🐛',
      value: 'fix'
    },
    perf: {
      description: '提高效能的程式碼修正',
      emoji: '⚡️',
      value: 'perf'
    },
    refactor: {
      description: '重構 or 優化，不屬於 bug 也不屬於新增功能等',
      emoji: '💡',
      value: 'refactor'
    },
    release: {
      description: '新增正式釋出的 release commit 訊息',
      emoji: '🏹',
      value: 'release'
    },
    style: {
      description: '修改程式碼格式或風格，不影響原有運作，例如 ESLint (formatting, missing semi colons, …)',
      emoji: '💄',
      value: 'style'
    },
    test: {
      description: '增加測試功能 (when adding missing tests)',
      emoji: '💍',
      value: 'test'
    },
  },
  messages: {  // Commit 的提示訊息描述
    type: '請選擇您要 Commit 的類型(必選)：',
    customScope: '選擇此次 Commit 影響的範圍(可選，若無，請按 Enter 略過):',
    subject: '簡短描述 Commit 的修正範圍(必填)：\n',
    body: '更詳細的 Commit 說明(可選，若無，請按 Enter 略過):\n ',
    breaking: '列出所有重大更改(可選，若無，請按 Enter 略過):\n',
    footer: '此次 Commit 會關閉的 Issues, e.g #123(可選，若無，請按 Enter 略過):',
    confirmCommit: '請確認本次 Commit 描述。\n',
  },
};
```

實際內容:
![image.png](https://i.imgur.com/dbZ79BB.png)

## Rules

**提交訊息的結構：**

1. **標題行（必填）：**
    
    - 格式：`<類型>(<範圍>): <簡短描述>`
    - **類型（type）：** 描述提交的類型，例如：
        - `feat`：新功能
        - `fix`：修復錯誤
        - `docs`：文件變更
        - `style`：格式（不影響程式碼運行的變更）
        - `refactor`：重構（既不是修復錯誤也不是添加功能的代碼變動）
        - `perf`：性能優化
        - `test`：添加測試
        - `build`：影響構建系統或外部依賴的變更（例如：npm、gulp、webpack）
        - `ci`：持續整合相關的變更（例如：Travis、Circle、Jenkins）
        - `chore`：其他不修改 src 或測試文件的變更
        - `revert`：回退先前的提交
    - **範圍（scope）：** 可選，表示影響的範圍，例如模塊、功能等。
    - **簡短描述（subject）：** 簡潔描述提交內容，建議不超過50個字符。
2. **主體（可選）：**
    
    - 詳細描述提交內容，可以包含變更的原因、目的等。
    - 每行建議不超過72個字符。
3. **頁腳（可選）：**
    
    - 用於引用相關的問題（issues）或提交，或描述破壞性變更（BREAKING CHANGE）。
    - **關聯問題：** 使用 `關聯問題: #issue_number` 格式。
    - **破壞性變更：** 使用 `BREAKING CHANGE: 描述內容` 格式，詳細說明變更內容和影響。

**注意事項：**

- **標題行的長度限制：**
    
    - 簡短描述（subject）建議限制在50個字符以內，確保簡潔明了。
    - 整個標題行（類型、範圍、簡短描述）的總長度建議不超過72個字符。
- **主體行的長度限制：**
    
    - 主體部分的每行建議不超過72個字符，方便閱讀。
- **類型小寫：**
    
    - 類型（type）應全部使用小寫字母。
- **範圍可選：**
    
    - 範圍（scope）是可選的，但有助於了解提交影響的模塊或功能。
- **破壞性變更：**
    
    - 如果提交包含破壞性變更，必須在頁腳部分以 `BREAKING CHANGE:` 開頭，詳細說明變更內容和影響。

## References

1. [git-cz客製化](https://israynotarray.com/git/20221115/721294310/)
2. [git commit message golden rules翻譯](https://hackmd.io/@howhow/git_commit)
3. [coventional commits org](https://www.conventionalcommits.org/zh-hant/v1.0.0/#%e8%a6%8f%e7%af%84)
4. [約定式提交 Conventional Commits](https://www.cythilya.tw/2021/03/16/conventional-commits/)

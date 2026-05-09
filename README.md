# code-governance-guard

`code-governance-guard` 是一个可通过 npm 安装的 Codex Skill，用于在代码编写、修改、重构、审查、测试和构建过程中启用全局代码治理规则。

该 Skill 主要提供以下约束：

1. 禁止随意回滚当前代码到 git 分支或历史提交。
2. 回滚前必须备份当前代码，并获得用户二次确认。
3. 删除文件、目录或清理项目时必须说明范围、影响和恢复方案，并二次确认。
4. 禁止删除整个项目、仓库根目录、`.git` 目录和用户数据。
5. 禁止直接执行数据库删除、清空或无条件更新命令。
6. 中文乱码必须修复为正常中文，禁止用 Unicode 转义形式替代中文正文。
7. 前后端代码开发遵守阿里开发规范，补充必要的方法级和区块级注释。
8. 禁止产生冗余代码，修改后需要清理无用导入、死代码、重复逻辑和过期注释。
9. 每次修改代码后必须执行可用的安装、构建、编译、类型检查、静态检查或测试命令，确认项目能够正常通过。
10. 前端代码生成需要优先遵循 `ui-ux-pro-max` 技能；如果该技能不可用，则使用本包内置的前端 UI 质量规则。

## 安装方式

### 全局安装

```bash
npm install -g code-governance-guard
code-governance-guard install
```

### 使用 npx 安装

```bash
npx code-governance-guard install
```

### 安装到指定 Skill 目录

```bash
code-governance-guard install --path ~/.codex/skills
```

Windows 示例：

```powershell
code-governance-guard install --path C:\Users\your-name\.codex\skills
```

### 预览安装操作

只查看将要复制到哪里，不实际写入文件：

```bash
code-governance-guard install --dry-run
```

### 覆盖已有安装

如果目标目录已存在同名 Skill，默认不会静默覆盖。需要更新时使用 `--force`，安装器会先备份旧版本，再复制新版本：

```bash
code-governance-guard install --force
```

## 安装路径优先级

安装器会按以下顺序选择 Codex Skills 目录：

1. 命令行参数 `--path`
2. 环境变量 `CODEX_HOME/skills`
3. 当前用户目录下的 `.codex/skills`

安装后目录结构示例：

```text
~/.codex/skills/
  code-governance-guard/
    SKILL.md
    agents/
      openai.yaml
    references/
      safety-rules.md
      alibaba-code-style.md
      frontend-ui-rules.md
```

## 使用方式

安装完成后，在 Codex 对话中显式启用：

```text
Use $code-governance-guard while modifying this codebase.
```

中文示例：

```text
请使用 $code-governance-guard 修改这个项目，所有代码变更都必须遵守安全、阿里规范、中文编码和构建验证要求。
```

Skill 一旦在当前对话中触发，会对后续代码相关任务持续生效，直到用户明确要求停止或更换规则。

## 命令参数

```bash
code-governance-guard install [--path <skills-dir>] [--dry-run] [--force]
```

参数说明：

1. `--path <skills-dir>`：指定 Codex Skills 安装目录。
2. `--dry-run`：预览安装路径和操作，不修改文件。
3. `--force`：当目标 Skill 已存在时，先备份旧目录，再安装新版本。
4. `--help` 或 `-h`：查看命令帮助。

## 本地开发验证

在项目根目录执行：

```bash
npm run check
npm pack --dry-run
```

`npm run check` 会执行安装 dry-run；`npm pack --dry-run` 会检查 npm 包实际会发布的文件列表。

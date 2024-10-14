# Meデコ

石巻ハッカソン2024

<br>

## 🔗 リンク

### リポジトリ

- https://github.com/shota-sa-ito/medeko

<br>

## 🍀 推奨開発環境

### Runtime

- [Node](https://nodejs.org) v20.18.x
- [Bun](https://bun.sh) v1.1.x

### CLI

- [Turso CLI](https://docs.turso.tech/quickstart) v1.0.x

<br>

### IDE

- [VSCode](https://code.visualstudio.com)

#### VSCode 拡張機能

本リポジトリで推奨している拡張機能は [`.vscode/extensions.json`](./.vscode/extensions.json) に記載しています。\
また、VSCode の拡張機能インストールタブの検索窓に `@recommended` と入力することで、このリポジトリで推奨している拡張機能の一覧を表示させることができます。

<br>

### パッケージマネージャー

- [bun](https://bun.sh)

<br>

## 🚀 使用技術

### メタフレームワーク

- [Astro](https://astro.build)

### フロントエンド

- [Solid.js](https://www.solidjs.com)

### スタイリングライブラリ

- 特になし（おまかせ）

### トランジションライブラリ

- [swup](https://swup.js.org)

<br>

## 🎱 開発

### 開発環境の立ち上げ方

1. リポジトリをクローン
2. パッケージをインストール
3. 開発環境を起動

<br>

## 📜 コマンド

### セットアップ

```sh
bun install
```

＊ リポジトリの初回クローン時などに実行してください。

<br>

### 開発環境の起動

```sh
bun dev
```

<br>

### 擬似本番環境の起動

```sh
bun prod
```

<br>

### ビルド

```sh
bun build
```

<br>

### フォーマット

```sh
bun format
```

<br>

### チェック

```sh
bun check
```

<br>

## 📂 プロジェクトの構成

```
/
├── public/
│
├── src/
│   └── layouts/
│       ├── _assets/
│       ├── _components/
│       ├── _fragments/
│       ├── _layout/
│       ├── _states/
│       ├── _styles/
│       └── _utils/
│   └── pages/
│       └── [slug]
│           ├── _assets/
│           ├── _components/
│           ├── _fragments/
│           ├── _layout/
│           ├── _states/
│           ├── _styles/
│           ├── _utils/
│           └── [slug]
│               └── ...
│   ├── assets/
│   ├── constants/
│   ├── scripts/
│   ├── styles/
│   └── utils/
└── package.json
```

- `/public` ... ビルド時にバンドルされたくない静的ファイルを配置するディレクトリ

- `/src`

  - `/pages` ... クライアント側のコードを配置するディレクトリ

    - `/_layouts` ... ページコンポーネントで用いられるレイアウトコンポーネントを配置するディレクトリ

    - `/_components` ... 汎用的なコンポーネントを配置するディレクトリ

    - `/_fragments` ... 限定的な（原則１つのファイル内でしか使用されない）コンポーネントを配置するディレクトリ

    - `/_assets` ... 静的ファイルを配置するディレクトリ

    - `/_constants` ... 定数を配置するディレクトリ

    - `/_states` ... 状態を配置するディレクトリ

    - `/_scripts` ... グローバルスコープに干渉するなどの副作用のあるスクリプトを配置するディレクトリ

    - `/_styles` ... スタイルを配置するディレクトリ

    - `/_utils` ... 汎用的なスクリプトファイルを配置するディレクトリ

  - `/actions` ... サーバー側のコードを配置するディレクトリ

import { BASIC_STYLE } from "../shared/style.mjs";

export class HomePage extends HTMLElement {
  // CSS生成関数
  css = () => /* CSS */ `
    ${BASIC_STYLE}

    /* 全体を縦flexにして、端から16pxの余白を用意する */
    :host {
      width: 100%;
      height: 100%;
      padding: 16px !important;
      display: flex;
      flex-direction: column;
    }

    /*
     * ヘッダーは横100%で高さ40pxの横flex
     * ヘッダー下すぐに入力フォームが来ないようにマージンをつける
     */
    header {
      width: 100%;
      height: 40px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
    }

    /* ヘッダーのタイトルは太字で大きな文字にする */
    header span {
      width: 100%;
      font-weight: bold;
      font-size: 24px;
      text-align: center;
    }

    /*
     * ToDoリストは縦flexで画面の残り領域全体に広がるように設定
     */
    main {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    a.new {
      position: absolute;
      right: 16px;
      bottom: 16px;
      width: 40px;
      height: 40px;
      padding: 2px;
      border: 2px solid blue;
      border-radius: 32px;
      line-height: 1;
      font-size: 32px;
      text-align: center;
      text-decoration: none;
      color: inherit;
    }
  `;

  // HTML生成関数
  html = () => /* HTML */ `
    <style>
      ${this.css()}
    </style>
    <header>
      <span>ToDo</span>
    </header>
    <main>
      <!--
        localStorageにObject.entriesを利用して、保存されている値を反復処理する
        JSON文字列を渡すとき、内部に含まれるダブルクォーテーションで文字列が分割されてしまうのを、シングルクォーテーションで囲んで防いでいる
        最後にjoin("")とすることで、全体の処理結果を一つの文字列に結合している
      -->
      ${Object.entries(localStorage)
        .map(
          ([id, data]) => /* HTML */ `
            <!-- prettier-ignore -->
            <todo-component id="${id}" data='${data}'></todo-component>
          `
        )
        .join("")}
    </main>
    <a class="new" href="#edit">➕</a>
  `;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.setHTMLUnsafe(this.html());
  }
}

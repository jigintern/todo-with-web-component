import { BASIC_STYLE } from "../shared/style.mjs";

export class TodoComponent extends HTMLElement {
  id = undefined;
  title = undefined;
  done = false;

  // CSS生成関数
  css = () => /* CSS */ `
    ${BASIC_STYLE}

    /* 全体を横flexにする */
    :host {
      width: 100%;
      height: 32px;
      padding: 0 16px !important;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* a要素のデフォルトスタイルを打ち消しつつ、横flexにする */
    a {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      text-decoration: none;
      color: inherit;
    }

    a .title {
      width: 100%;
    }
  `;

  // HTML生成関数
  html = () => /* HTML */ `
    <style>
      ${this.css()}
    </style>
    <input type="checkbox" ${this.done ? "checked" : ""} />
    <a href="?id=${this.id}#edit">
      <span class="title">${this.title}</span>
      <span class="arrow">➡️</span>
    </a>
  `;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // 与えられた属性の値を取得して保持する
    this.id = this.getAttribute("id");
    console.log(this.getAttribute("data"));
    const data = JSON.parse(this.getAttribute("data"));
    this.title = data?.title;
    this.done = data?.done ?? false;
    this.render();
  }

  render() {
    this.shadowRoot.setHTMLUnsafe(this.html());

    // チェックボックスの状態の変更イベントにイベントリスナーを設定
    this.shadowRoot
      .querySelector('input[type="checkbox"]')
      .addEventListener("change", () => this.onDoneChanged());
  }

  onDoneChanged() {
    // 現時点での状態を取得
    const checkbox = this.shadowRoot.querySelector('input[type="checkbox"]');
    this.done = checkbox?.checked ?? false;
    // ローカルストレージに保存
    localStorage.setItem(this.id, JSON.stringify({ title: this.title, done: this.done }));
    // 更新された状態をページに反映するため再レンダリング
    this.render();
  }
}

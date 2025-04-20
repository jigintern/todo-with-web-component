import { BASIC_STYLE } from "../shared/style.mjs";

export class EditPage extends HTMLElement {
  id = undefined;
  title = undefined;
  done = false;

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

    /*
     * ヘッダー中のボタンは正方形の大きさを持つように
     * ボタンのデフォルトスタイルを打ち消しつつ、フォントサイズと行高さを調整する
     */
    header button {
      width: 32px;
      height: 32px;
      border: none;
      background-color: transparent;
      font-size: 32px;
      line-height: 1;
    }

    /* ヘッダーのタイトルは太字で大きな文字にする */
    header span {
      width: 100%;
      font-weight: bold;
      font-size: 24px;
      text-align: center;
    }

    /*
     * 入力フォームは縦flexで画面の残り領域全体に広がるように設定
     * 要素間に8pxの隙間を設ける
     */
    main {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    /* 各行は横flexで縦中央揃え、ラベルとコンテンツの間に8px隙間を設ける */
    main label {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    /* ラベルテキストが縮まないように */
    main label span {
      flex-shrink: 0;
    }

    /* タスク名の入力欄を角丸で囲んで丸に被らないように余白を設定 */
    main input[type="text"] {
      width: 100%;
      height: 32px;
      border: 2px solid lightgray;
      border-radius: 32px;
      padding: 0 16px;
    }
  `;

  // HTML生成関数
  html = () => /* HTML */ `
    <style>
      ${this.css()}
    </style>
    <header>
      <button class="back">⬅️</button>
      <span>ToDo詳細</span>
      <button class="save">💾</button>
    </header>
    <main>
      <label>
        <span>タスク名</span>
        <input type="text" placeholder="タスク名" value="${this.title ?? ""}" />
      </label>
      <label>
        <input type="checkbox" ${this.done ? "checked" : ""} />
        <span>完了済み</span>
      </label>
    </main>
  `;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // URLクエリパラメータでIDが渡される
    const url = new URL(location.href);
    const paramId = url.searchParams.get("id");
    if (paramId) {
      // IDが渡されてきたら既存のタスクの修正なので、localstorageからデータを取得
      const data = JSON.parse(localStorage.getItem(paramId));
      this.id = paramId;
      this.title = data?.title;
      this.done = data?.done ?? false;
    } else {
      // IDが渡されなければ新規なのでIDを生成
      // crupto.randomUUIDは桁数の大きい乱数生成で、現実的な回数で衝突し得ないため衝突の確認の必要がない
      this.id = crypto.randomUUID();
    }
    this.render();
  }

  render() {
    this.shadowRoot.setHTMLUnsafe(this.html());

    // ToDo一覧に遷移するボタンのイベントリスナーを設定
    this.shadowRoot
      .querySelector("button.back")
      .addEventListener("click", () => this.onClickBack());
    // ToDoを保存するボタンのイベントリスナーを設定
    this.shadowRoot
      .querySelector("button.save")
      .addEventListener("click", () => this.onClickSave());
  }

  // ToDo一覧画面に遷移する関数
  backToHome() {
    const url = new URL(location.href);
    url.hash = "#home";
    url.search = "";
    location.href = url.toString();
  }

  // ToDo一覧に遷移するボタンのイベントハンドラ
  onClickBack() {
    this.backToHome();
  }

  // ToDoを保存するボタンのイベントハンドラ
  onClickSave() {
    // input要素から入力内容を取得する
    const editedTitle = this.shadowRoot.querySelector('input[type="text"]')?.value;
    // タスク名が未設定なら登録せずに処理を終了する
    if (!editedTitle) {
      alert("タスク名が入力されていません");
      return;
    }
    const editedDone = this.shadowRoot.querySelector('input[type="checkbox"]')?.checked ?? false;
    // タスク名が設定されていれば登録して一覧画面に遷移
    localStorage.setItem(this.id, JSON.stringify({ title: editedTitle, done: editedDone }));
    this.backToHome();
  }
}

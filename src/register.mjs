// パーツ用カスタム要素の読み込み
// import { <パーツ用カスタム要素クラス名> } from "./components/<ファイル名>.components.mjs";
import { TodoComponent } from "./components/todo.component.mjs";

// ページ用カスタム要素の読み込み
// import { <ページ用カスタム要素クラス名> } from "./pages/<ファイル名>.page.mjs";
import { EditPage } from "./pages/edit.page.mjs";
import { HomePage } from "./pages/home.page.mjs";

// パーツ用カスタム要素の登録
// customElements.define(<パーツ用カスタム要素名>, <パーツ用カスタム要素クラス名>);
customElements.define("todo-component", TodoComponent);

// ページ用カスタム要素の登録
// customElements.define(<ページ用カスタム要素名>,  <ページ用カスタム要素クラス名>);
customElements.define("edit-page", EditPage);
customElements.define("home-page", HomePage);

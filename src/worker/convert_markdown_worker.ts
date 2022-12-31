import * as marked from 'marked'
import * as sanitizeHtml from 'sanitize-html'

//Web Worker を変数にセット
//self as any と書くことで型チェックを回避します
const worker: Worker = self as any;

//メインスレッドからデータを渡された際に実行する関数を定義
worker.addEventListener('message', (event) => {
	//メインスレッドからのテキストデータ（マークダウン）を markedでHTMLに変換。
	const text = event.data

	//サニタイズ処理
	const html = sanitizeHtml(marked(text), { allowedTags: [...sanitizeHtml.defaults.allowedTags, 'h1', 'h2'] })

	//メインスレッドに結果の HTMLを返却
	worker.postMessage({ html })
})

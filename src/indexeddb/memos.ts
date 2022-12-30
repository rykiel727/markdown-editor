import Dexie from 'dexie'

//保存するデータの型を定義
export interface MemoRecord {
  datetime: string
  title: string
  text: string
}

//Dexie のインスタンスを生成（データベース名は markdown-editor）
const database = new Dexie('markdown-editor')

//.version(1) はデータベースのバージョン
//.stores() で使用するテーブルとインデックスとなるデータ名を指定
database.version(1).stores({ memos: '&datetime' })

//データを扱うテーブルクラスを取得
const memos: Dexie.Table<MemoRecord, string> = database.table('memos')

//メモを保存するために、タイトルとテキストを引数として受け取る関数を定義
export const putMemo = async (title: string, text: string): Promise<void> => {
	const datetime = new Date().toISOString()
	await memos.put({ datetime, title, text })
}

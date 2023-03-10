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

//1ページあたりの件数定義
const NUM_PER_PAGE: number = 10

export const getMemoPageCount = async (): Promise<number> => {
  //memos テーブルから総件数を取得
  const totalCount = await memos.count();

  //トータルの件数から1ページあたりの件数で割って、ページ数を算出
  const pageCount = Math.ceil(totalCount / NUM_PER_PAGE);

  //0件でも1ページと判定
  return pageCount > 0 ? pageCount : 1;
}

//テキスト履歴をリストで取得する関数を定義
export const getMemos = (page: number): Promise<MemoRecord[]> => {
  //ページ数をもとに、取得する最初に位置（OFFSET）を算出
  const offset = (page - 1) * NUM_PER_PAGE

  //memos テーブルからデータを取得する処理
  //orderBy で datetime（保存した日時）の昇順（古い順）で取得
  //reverse で並び順を逆に
  //toArray で取得したデータを配列に変換して返却
  return memos.orderBy('datetime')
              .reverse()
              .offset(offset)
              .limit(NUM_PER_PAGE)
              .toArray()
}

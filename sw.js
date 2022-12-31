//キャッシュの名前を定義
//キャッシュ名は任意の文字列でOK。バージョンが分かるように定義したほうが良い。
const CacheName = 'Cache:v1'

//self はサービスワーカー自身を指す
//addEventListener で各イベントにコールバックを登録
self.addEventListener('install', (event) => {
  console.log('ServiceWorker install:', event)
});

self.addEventListener('activate', (event) => {
  console.log('ServiceWorker activate:', event)
});

/Network falling back to cache の実装関数
const networkFallingBackToCache = async (request) => {
	//定義した名前で、キャッシュを開く
	const cache = await caches.open(CacheName);
	try {
		//通常の fetch リクエストを実行してレスポンスを取得
		const response = await fetch(request);

		//レスポンス内容をキャッシュに保存
		await cache.put(request, response.clone());

		//レスポンスを呼び出し元に返却
		return response
	} catch (err) {
		//エラーが発生した場合、コンソールにエラーを表示して、キャッシュの内容を返却する
		console.error(err)
		return cache.match(request)
	}
}

//ネットワークリクエストの処理に実行する処理を登録
self.addEventListener('fetch', (event) => {
	//event.respondWithは、非同期処理（Promise）の実行終了まで待機してくれるメソッド
	//ネットワークリクエストを行って結果をメインスレッドに戻す
	event.respondWith(networkFallingBackToCache(event.request))
});

import sys
import datetime
import json
from google.cloud import firestore
import time


# ------------------------------------------------------------------
sys.stderr.write("*** 開始 ***\n")
try:

    db = firestore.Client()
    for i in range(10):
        print(f'{i+1}回目データ挿入スタート')
        docs = db.collection(u'missions').stream()
        for m_doc in docs:
            nowData = m_doc.to_dict()
            data = {}
            data[u'createTime'] = firestore.SERVER_TIMESTAMP
            data[u'mission'] = m_doc.id
            data[u'point'] = nowData['point']
            data[u'table'] = 'A'
            data[u'text'] = None
            data[u'user'] = 'TEST_USER'
            db.collection(u'answered').document().set(data)
            time.sleep(0.3）
            print(f'データ投入[{m_doc.id}]')
        time.sleep(10)
        answered_docs = db.collection(u'answered').stream()
        print(f'{i+1}回目データ削除スタート')
        for a_docs in answered_docs:
            db.collection(u'answered').document(a_docs.id).delete()
        print(f'{i+1}回目データ削除エンド')

except Exception as ee:
    sys.stderr.write("*** error *** in firestore.Client ***\n")
    sys.stderr.write(str(ee) + "\n")
#
sys.stderr.write("*** 終了 ***\n")
# ------------------------------------------------------------------
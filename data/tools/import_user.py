import sys
import datetime
import json
from google.cloud import firestore

#
# ------------------------------------------------------------------
sys.stderr.write("*** 開始 ***\n")
try:
    json_open = open('../user.json','r')
    datas = json.load(json_open)

    db = firestore.Client()
    for data in datas:
        data[u'createTime'] = firestore.SERVER_TIMESTAMP
        db.collection(u'users').document().set(data)

except Exception as ee:
    sys.stderr.write("*** error *** in firestore.Client ***\n")
    sys.stderr.write(str(ee) + "\n")
#
sys.stderr.write("*** 終了 ***\n")
# ------------------------------------------------------------------
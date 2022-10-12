import sys
import datetime
import json
from google.cloud import firestore

# ------------------------------------------------------------------
def add_data_proc(db,key,name,population):
    sys.stderr.write("key = " + key + "\n")
    doc_ref = db.collection('cities').document(key)
    doc_ref.set({
        'name': name,
        'population': population,
        'date_mod': datetime.datetime.utcnow()
    })
#
# ------------------------------------------------------------------
sys.stderr.write("*** 開始 ***\n")
try:
    json_open = open('../mission.json','r')
    datas = json.load(json_open)

    db = firestore.Client()
    for data in datas:
      data[u'createTime'] = firestore.SERVER_TIMESTAMP
      db.collection(u'missions').document().set(data)

except Exception as ee:
    sys.stderr.write("*** error *** in firestore.Client ***\n")
    sys.stderr.write(str(ee) + "\n")
#
sys.stderr.write("*** 終了 ***\n")
# ------------------------------------------------------------------
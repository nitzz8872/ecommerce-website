import pdfplumber
import re
import io
import fitz
from collections import namedtuple
Line=('Line','VENDOR_NAME ADDRESS STATE_CODE INVOICE_NO PO_NO PO_DATE INVOICE_DATE PAN ITEM HSN_SAC QUANTITY TOTAL')
pdf=fitz.open("KAI10645.pdf")

lines=[]
for page in pdf:
    text=page.getText()
    print(text)
textt=text.split('\n')
text1 = ''.join(textt)
print(text1)
company= re.search('Altair.*?Ltd',text).group()# pdf plumbr
print(company)

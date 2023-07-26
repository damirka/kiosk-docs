Object.assign(window.search, {"doc_urls":["what_is_sui_kiosk.html#what-is-sui-kiosk","transfer_policy.html#transfer-policy"],"index":{"documentStore":{"docInfo":{"0":{"body":8,"breadcrumbs":2,"title":2},"1":{"body":129,"breadcrumbs":2,"title":2}},"docs":{"0":{"body":"Kiosk is type defined in the kiosk module in the Sui Framework package.","breadcrumbs":"What is Sui Kiosk","id":"0","title":"What is Sui Kiosk"},"1":{"body":"To understand the Kiosk we first need to go through the Transfer Policy. transfer_policy is a library located in the Sui Framework; it allows creating a non-discardable message - called TransferRequest - and the destination for this message - TransferPolicy. Imagine a tax system implementation on Sui: multiple merchants process payments and buyers need to pay \"VAT\". The TransferRequest struct and the matching TransferPolicy object address this problem. If a merchant creates a TransferRequest upon each purchase, and the TransferPolicy is configured to enforce the tax policy, the buyer will not be able to finalize the purchase the item until the tax is paid. This is a strong guarantee, because the TransferRequest is a non-discardable struct (so-called \"Hot Potato\") and unless it finds \"its home\", the transaction will fail. The TransferPolicy is the \"home\" for the TransferRequest and it can be configured to define the rules for the TransferRequest to be accepted. Because the system is designed for commerce, the TransferRequest has the most commonly used fields, such as: paid (the amount of SUI paid for the item) item (the ID of the item being transferred) from (the ID of the Kiosk / Source the item is being sold from) Additionally, thanks to the Move's type system, the TransferRequest is issued per type . This means that the TransferRequest for a \"Phone\" is different from the TransferRequest for a \"Car\". This allows to enforce different rules for different types of items.","breadcrumbs":"Transfer Policy","id":"1","title":"Transfer Policy"}},"length":2,"save":true},"fields":["title","body","breadcrumbs"],"index":{"body":{"root":{"a":{"c":{"c":{"df":0,"docs":{},"e":{"df":0,"docs":{},"p":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":1.0}}}}}},"df":0,"docs":{}},"d":{"d":{"df":0,"docs":{},"i":{"df":0,"docs":{},"t":{"df":0,"docs":{},"i":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"df":1,"docs":{"1":{"tf":1.0}}}}}}},"r":{"df":0,"docs":{},"e":{"df":0,"docs":{},"s":{"df":0,"docs":{},"s":{"df":1,"docs":{"1":{"tf":1.0}}}}}}},"df":0,"docs":{}},"df":0,"docs":{},"l":{"df":0,"docs":{},"l":{"df":0,"docs":{},"o":{"df":0,"docs":{},"w":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}}}}},"m":{"df":0,"docs":{},"o":{"df":0,"docs":{},"u":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":1.0}}}}}}}},"b":{"df":0,"docs":{},"e":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}},"u":{"df":0,"docs":{},"y":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}}}}}},"c":{"a":{"df":0,"docs":{},"l":{"df":0,"docs":{},"l":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}}},"r":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{},"o":{"df":0,"docs":{},"m":{"df":0,"docs":{},"m":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"c":{"df":1,"docs":{"1":{"tf":1.0}}},"df":0,"docs":{}}},"o":{"df":0,"docs":{},"n":{"df":0,"docs":{},"l":{"df":0,"docs":{},"i":{"df":1,"docs":{"1":{"tf":1.0}}}}}}}},"n":{"df":0,"docs":{},"f":{"df":0,"docs":{},"i":{"df":0,"docs":{},"g":{"df":0,"docs":{},"u":{"df":0,"docs":{},"r":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}}}}}}}},"r":{"df":0,"docs":{},"e":{"a":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}}},"df":0,"docs":{}}}},"d":{"df":0,"docs":{},"e":{"df":0,"docs":{},"f":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":2,"docs":{"0":{"tf":1.0},"1":{"tf":1.0}}}}},"s":{"df":0,"docs":{},"i":{"df":0,"docs":{},"g":{"df":0,"docs":{},"n":{"df":1,"docs":{"1":{"tf":1.0}}}}},"t":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":1,"docs":{"1":{"tf":1.0}}}}}}},"i":{"df":0,"docs":{},"f":{"df":0,"docs":{},"f":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"1":{"tf":1.7320508075688772}}}}}},"s":{"c":{"a":{"df":0,"docs":{},"r":{"d":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":0,"docs":{}}}},"df":0,"docs":{},"e":{"a":{"c":{"df":0,"docs":{},"h":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{}},"df":0,"docs":{},"n":{"df":0,"docs":{},"f":{"df":0,"docs":{},"o":{"df":0,"docs":{},"r":{"c":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}},"df":0,"docs":{}}}}}},"f":{"a":{"df":0,"docs":{},"i":{"df":0,"docs":{},"l":{"df":1,"docs":{"1":{"tf":1.0}}}}},"df":0,"docs":{},"i":{"df":0,"docs":{},"e":{"df":0,"docs":{},"l":{"d":{"df":1,"docs":{"1":{"tf":1.0}}},"df":0,"docs":{}}},"n":{"a":{"df":0,"docs":{},"l":{"df":1,"docs":{"1":{"tf":1.0}}}},"d":{"df":1,"docs":{"1":{"tf":1.0}}},"df":0,"docs":{}},"r":{"df":0,"docs":{},"s":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":1.0}}}}}},"r":{"a":{"df":0,"docs":{},"m":{"df":0,"docs":{},"e":{"df":0,"docs":{},"w":{"df":0,"docs":{},"o":{"df":0,"docs":{},"r":{"df":0,"docs":{},"k":{"df":2,"docs":{"0":{"tf":1.0},"1":{"tf":1.0}}}}}}}}},"df":0,"docs":{}}},"g":{"df":0,"docs":{},"o":{"df":1,"docs":{"1":{"tf":1.0}}},"u":{"a":{"df":0,"docs":{},"r":{"a":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":0,"docs":{},"e":{"df":1,"docs":{"1":{"tf":1.0}}}}}},"df":0,"docs":{}}},"df":0,"docs":{}}},"h":{"df":0,"docs":{},"o":{"df":0,"docs":{},"m":{"df":0,"docs":{},"e":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}}},"t":{"df":1,"docs":{"1":{"tf":1.0}}}}},"i":{"d":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}},"df":0,"docs":{},"m":{"a":{"df":0,"docs":{},"g":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":1,"docs":{"1":{"tf":1.0}}}}}},"df":0,"docs":{},"p":{"df":0,"docs":{},"l":{"df":0,"docs":{},"e":{"df":0,"docs":{},"m":{"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":1.0}}}}}}}}}},"s":{"df":0,"docs":{},"s":{"df":0,"docs":{},"u":{"df":1,"docs":{"1":{"tf":1.0}}}}},"t":{"df":0,"docs":{},"e":{"df":0,"docs":{},"m":{"df":1,"docs":{"1":{"tf":2.449489742783178}}}}}},"k":{"df":0,"docs":{},"i":{"df":0,"docs":{},"o":{"df":0,"docs":{},"s":{"df":0,"docs":{},"k":{"df":2,"docs":{"0":{"tf":1.7320508075688772},"1":{"tf":1.4142135623730951}}}}}}},"l":{"df":0,"docs":{},"i":{"b":{"df":0,"docs":{},"r":{"a":{"df":0,"docs":{},"r":{"df":0,"docs":{},"i":{"df":1,"docs":{"1":{"tf":1.0}}}}},"df":0,"docs":{}}},"df":0,"docs":{}},"o":{"c":{"a":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{}},"df":0,"docs":{}}},"m":{"a":{"df":0,"docs":{},"t":{"c":{"df":0,"docs":{},"h":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{}}},"df":0,"docs":{},"e":{"a":{"df":0,"docs":{},"n":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{},"r":{"c":{"df":0,"docs":{},"h":{"a":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}}}},"df":0,"docs":{}}},"df":0,"docs":{}},"s":{"df":0,"docs":{},"s":{"a":{"df":0,"docs":{},"g":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}}},"df":0,"docs":{}}}},"o":{"d":{"df":0,"docs":{},"u":{"df":0,"docs":{},"l":{"df":1,"docs":{"0":{"tf":1.0}}}}},"df":0,"docs":{},"v":{"df":0,"docs":{},"e":{"'":{"df":1,"docs":{"1":{"tf":1.0}}},"df":0,"docs":{}}}},"u":{"df":0,"docs":{},"l":{"df":0,"docs":{},"t":{"df":0,"docs":{},"i":{"df":0,"docs":{},"p":{"df":0,"docs":{},"l":{"df":1,"docs":{"1":{"tf":1.0}}}}}}}}},"n":{"df":0,"docs":{},"e":{"df":0,"docs":{},"e":{"d":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}},"df":0,"docs":{}}},"o":{"df":0,"docs":{},"n":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}}}},"o":{"b":{"df":0,"docs":{},"j":{"df":0,"docs":{},"e":{"c":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{}}}},"df":0,"docs":{}},"p":{"a":{"c":{"df":0,"docs":{},"k":{"a":{"df":0,"docs":{},"g":{"df":1,"docs":{"0":{"tf":1.0}}}},"df":0,"docs":{}}},"df":0,"docs":{},"i":{"d":{"df":1,"docs":{"1":{"tf":1.7320508075688772}}},"df":0,"docs":{}},"y":{"df":1,"docs":{"1":{"tf":1.0}},"m":{"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":1.0}}}}}}}},"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"1":{"tf":1.0}}}},"h":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"df":0,"docs":{},"e":{"df":1,"docs":{"1":{"tf":1.0}}}}}},"o":{"df":0,"docs":{},"l":{"df":0,"docs":{},"i":{"c":{"df":0,"docs":{},"i":{"df":1,"docs":{"1":{"tf":1.7320508075688772}}}},"df":0,"docs":{}}},"t":{"a":{"df":0,"docs":{},"t":{"df":0,"docs":{},"o":{"df":1,"docs":{"1":{"tf":1.0}}}}},"df":0,"docs":{}}},"r":{"df":0,"docs":{},"o":{"b":{"df":0,"docs":{},"l":{"df":0,"docs":{},"e":{"df":0,"docs":{},"m":{"df":1,"docs":{"1":{"tf":1.0}}}}}},"c":{"df":0,"docs":{},"e":{"df":0,"docs":{},"s":{"df":0,"docs":{},"s":{"df":1,"docs":{"1":{"tf":1.0}}}}}},"df":0,"docs":{}}},"u":{"df":0,"docs":{},"r":{"c":{"df":0,"docs":{},"h":{"a":{"df":0,"docs":{},"s":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}}},"df":0,"docs":{}}},"df":0,"docs":{}}}},"r":{"df":0,"docs":{},"u":{"df":0,"docs":{},"l":{"df":0,"docs":{},"e":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}}}}},"s":{"df":0,"docs":{},"o":{"df":0,"docs":{},"l":{"d":{"df":1,"docs":{"1":{"tf":1.0}}},"df":0,"docs":{}},"u":{"df":0,"docs":{},"r":{"c":{"df":1,"docs":{"1":{"tf":1.0}}},"df":0,"docs":{}}}},"t":{"df":0,"docs":{},"r":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"df":0,"docs":{},"g":{"df":1,"docs":{"1":{"tf":1.0}}}}},"u":{"c":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}}},"df":0,"docs":{}}}},"u":{"c":{"df":0,"docs":{},"h":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{},"i":{"df":2,"docs":{"0":{"tf":1.4142135623730951},"1":{"tf":1.7320508075688772}}}},"y":{"df":0,"docs":{},"s":{"df":0,"docs":{},"t":{"df":0,"docs":{},"e":{"df":0,"docs":{},"m":{"df":1,"docs":{"1":{"tf":1.7320508075688772}}}}}}}},"t":{"a":{"df":0,"docs":{},"x":{"df":1,"docs":{"1":{"tf":1.7320508075688772}}}},"df":0,"docs":{},"h":{"a":{"df":0,"docs":{},"n":{"df":0,"docs":{},"k":{"df":1,"docs":{"1":{"tf":1.0}}}}},"df":0,"docs":{},"r":{"df":0,"docs":{},"o":{"df":0,"docs":{},"u":{"df":0,"docs":{},"g":{"df":0,"docs":{},"h":{"df":1,"docs":{"1":{"tf":1.0}}}}}}}},"r":{"a":{"df":0,"docs":{},"n":{"df":0,"docs":{},"s":{"a":{"c":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{}},"df":0,"docs":{},"f":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"_":{"df":0,"docs":{},"p":{"df":0,"docs":{},"o":{"df":0,"docs":{},"l":{"df":0,"docs":{},"i":{"c":{"df":0,"docs":{},"i":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{}}}}}},"df":1,"docs":{"1":{"tf":1.7320508075688772}},"p":{"df":0,"docs":{},"o":{"df":0,"docs":{},"l":{"df":0,"docs":{},"i":{"c":{"df":0,"docs":{},"i":{"df":1,"docs":{"1":{"tf":2.0}}}},"df":0,"docs":{}}}}},"r":{"df":0,"docs":{},"e":{"df":0,"docs":{},"q":{"df":0,"docs":{},"u":{"df":0,"docs":{},"e":{"df":0,"docs":{},"s":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":3.1622776601683795}}}}}}}}}}}}}}},"df":0,"docs":{}},"y":{"df":0,"docs":{},"p":{"df":0,"docs":{},"e":{"df":2,"docs":{"0":{"tf":1.0},"1":{"tf":1.7320508075688772}}}}}},"u":{"df":0,"docs":{},"n":{"d":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":0,"docs":{},"s":{"df":0,"docs":{},"t":{"a":{"df":0,"docs":{},"n":{"d":{"df":1,"docs":{"1":{"tf":1.0}}},"df":0,"docs":{}}},"df":0,"docs":{}}}}}},"df":0,"docs":{},"l":{"df":0,"docs":{},"e":{"df":0,"docs":{},"s":{"df":0,"docs":{},"s":{"df":1,"docs":{"1":{"tf":1.0}}}}}},"t":{"df":0,"docs":{},"i":{"df":0,"docs":{},"l":{"df":1,"docs":{"1":{"tf":1.0}}}}}},"p":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"df":1,"docs":{"1":{"tf":1.0}}}}},"s":{"df":1,"docs":{"1":{"tf":1.0}}}},"v":{"a":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{}}}},"breadcrumbs":{"root":{"a":{"c":{"c":{"df":0,"docs":{},"e":{"df":0,"docs":{},"p":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":1.0}}}}}},"df":0,"docs":{}},"d":{"d":{"df":0,"docs":{},"i":{"df":0,"docs":{},"t":{"df":0,"docs":{},"i":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"df":1,"docs":{"1":{"tf":1.0}}}}}}},"r":{"df":0,"docs":{},"e":{"df":0,"docs":{},"s":{"df":0,"docs":{},"s":{"df":1,"docs":{"1":{"tf":1.0}}}}}}},"df":0,"docs":{}},"df":0,"docs":{},"l":{"df":0,"docs":{},"l":{"df":0,"docs":{},"o":{"df":0,"docs":{},"w":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}}}}},"m":{"df":0,"docs":{},"o":{"df":0,"docs":{},"u":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":1.0}}}}}}}},"b":{"df":0,"docs":{},"e":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}},"u":{"df":0,"docs":{},"y":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}}}}}},"c":{"a":{"df":0,"docs":{},"l":{"df":0,"docs":{},"l":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}}},"r":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{},"o":{"df":0,"docs":{},"m":{"df":0,"docs":{},"m":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"c":{"df":1,"docs":{"1":{"tf":1.0}}},"df":0,"docs":{}}},"o":{"df":0,"docs":{},"n":{"df":0,"docs":{},"l":{"df":0,"docs":{},"i":{"df":1,"docs":{"1":{"tf":1.0}}}}}}}},"n":{"df":0,"docs":{},"f":{"df":0,"docs":{},"i":{"df":0,"docs":{},"g":{"df":0,"docs":{},"u":{"df":0,"docs":{},"r":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}}}}}}}},"r":{"df":0,"docs":{},"e":{"a":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}}},"df":0,"docs":{}}}},"d":{"df":0,"docs":{},"e":{"df":0,"docs":{},"f":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":2,"docs":{"0":{"tf":1.0},"1":{"tf":1.0}}}}},"s":{"df":0,"docs":{},"i":{"df":0,"docs":{},"g":{"df":0,"docs":{},"n":{"df":1,"docs":{"1":{"tf":1.0}}}}},"t":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":1,"docs":{"1":{"tf":1.0}}}}}}},"i":{"df":0,"docs":{},"f":{"df":0,"docs":{},"f":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"1":{"tf":1.7320508075688772}}}}}},"s":{"c":{"a":{"df":0,"docs":{},"r":{"d":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":0,"docs":{}}}},"df":0,"docs":{},"e":{"a":{"c":{"df":0,"docs":{},"h":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{}},"df":0,"docs":{},"n":{"df":0,"docs":{},"f":{"df":0,"docs":{},"o":{"df":0,"docs":{},"r":{"c":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}},"df":0,"docs":{}}}}}},"f":{"a":{"df":0,"docs":{},"i":{"df":0,"docs":{},"l":{"df":1,"docs":{"1":{"tf":1.0}}}}},"df":0,"docs":{},"i":{"df":0,"docs":{},"e":{"df":0,"docs":{},"l":{"d":{"df":1,"docs":{"1":{"tf":1.0}}},"df":0,"docs":{}}},"n":{"a":{"df":0,"docs":{},"l":{"df":1,"docs":{"1":{"tf":1.0}}}},"d":{"df":1,"docs":{"1":{"tf":1.0}}},"df":0,"docs":{}},"r":{"df":0,"docs":{},"s":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":1.0}}}}}},"r":{"a":{"df":0,"docs":{},"m":{"df":0,"docs":{},"e":{"df":0,"docs":{},"w":{"df":0,"docs":{},"o":{"df":0,"docs":{},"r":{"df":0,"docs":{},"k":{"df":2,"docs":{"0":{"tf":1.0},"1":{"tf":1.0}}}}}}}}},"df":0,"docs":{}}},"g":{"df":0,"docs":{},"o":{"df":1,"docs":{"1":{"tf":1.0}}},"u":{"a":{"df":0,"docs":{},"r":{"a":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":0,"docs":{},"e":{"df":1,"docs":{"1":{"tf":1.0}}}}}},"df":0,"docs":{}}},"df":0,"docs":{}}},"h":{"df":0,"docs":{},"o":{"df":0,"docs":{},"m":{"df":0,"docs":{},"e":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}}},"t":{"df":1,"docs":{"1":{"tf":1.0}}}}},"i":{"d":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}},"df":0,"docs":{},"m":{"a":{"df":0,"docs":{},"g":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":1,"docs":{"1":{"tf":1.0}}}}}},"df":0,"docs":{},"p":{"df":0,"docs":{},"l":{"df":0,"docs":{},"e":{"df":0,"docs":{},"m":{"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":1.0}}}}}}}}}},"s":{"df":0,"docs":{},"s":{"df":0,"docs":{},"u":{"df":1,"docs":{"1":{"tf":1.0}}}}},"t":{"df":0,"docs":{},"e":{"df":0,"docs":{},"m":{"df":1,"docs":{"1":{"tf":2.449489742783178}}}}}},"k":{"df":0,"docs":{},"i":{"df":0,"docs":{},"o":{"df":0,"docs":{},"s":{"df":0,"docs":{},"k":{"df":2,"docs":{"0":{"tf":2.0},"1":{"tf":1.4142135623730951}}}}}}},"l":{"df":0,"docs":{},"i":{"b":{"df":0,"docs":{},"r":{"a":{"df":0,"docs":{},"r":{"df":0,"docs":{},"i":{"df":1,"docs":{"1":{"tf":1.0}}}}},"df":0,"docs":{}}},"df":0,"docs":{}},"o":{"c":{"a":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{}},"df":0,"docs":{}}},"m":{"a":{"df":0,"docs":{},"t":{"c":{"df":0,"docs":{},"h":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{}}},"df":0,"docs":{},"e":{"a":{"df":0,"docs":{},"n":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{},"r":{"c":{"df":0,"docs":{},"h":{"a":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}}}},"df":0,"docs":{}}},"df":0,"docs":{}},"s":{"df":0,"docs":{},"s":{"a":{"df":0,"docs":{},"g":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}}},"df":0,"docs":{}}}},"o":{"d":{"df":0,"docs":{},"u":{"df":0,"docs":{},"l":{"df":1,"docs":{"0":{"tf":1.0}}}}},"df":0,"docs":{},"v":{"df":0,"docs":{},"e":{"'":{"df":1,"docs":{"1":{"tf":1.0}}},"df":0,"docs":{}}}},"u":{"df":0,"docs":{},"l":{"df":0,"docs":{},"t":{"df":0,"docs":{},"i":{"df":0,"docs":{},"p":{"df":0,"docs":{},"l":{"df":1,"docs":{"1":{"tf":1.0}}}}}}}}},"n":{"df":0,"docs":{},"e":{"df":0,"docs":{},"e":{"d":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}},"df":0,"docs":{}}},"o":{"df":0,"docs":{},"n":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}}}},"o":{"b":{"df":0,"docs":{},"j":{"df":0,"docs":{},"e":{"c":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{}}}},"df":0,"docs":{}},"p":{"a":{"c":{"df":0,"docs":{},"k":{"a":{"df":0,"docs":{},"g":{"df":1,"docs":{"0":{"tf":1.0}}}},"df":0,"docs":{}}},"df":0,"docs":{},"i":{"d":{"df":1,"docs":{"1":{"tf":1.7320508075688772}}},"df":0,"docs":{}},"y":{"df":1,"docs":{"1":{"tf":1.0}},"m":{"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":1.0}}}}}}}},"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"1":{"tf":1.0}}}},"h":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"df":0,"docs":{},"e":{"df":1,"docs":{"1":{"tf":1.0}}}}}},"o":{"df":0,"docs":{},"l":{"df":0,"docs":{},"i":{"c":{"df":0,"docs":{},"i":{"df":1,"docs":{"1":{"tf":2.0}}}},"df":0,"docs":{}}},"t":{"a":{"df":0,"docs":{},"t":{"df":0,"docs":{},"o":{"df":1,"docs":{"1":{"tf":1.0}}}}},"df":0,"docs":{}}},"r":{"df":0,"docs":{},"o":{"b":{"df":0,"docs":{},"l":{"df":0,"docs":{},"e":{"df":0,"docs":{},"m":{"df":1,"docs":{"1":{"tf":1.0}}}}}},"c":{"df":0,"docs":{},"e":{"df":0,"docs":{},"s":{"df":0,"docs":{},"s":{"df":1,"docs":{"1":{"tf":1.0}}}}}},"df":0,"docs":{}}},"u":{"df":0,"docs":{},"r":{"c":{"df":0,"docs":{},"h":{"a":{"df":0,"docs":{},"s":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}}},"df":0,"docs":{}}},"df":0,"docs":{}}}},"r":{"df":0,"docs":{},"u":{"df":0,"docs":{},"l":{"df":0,"docs":{},"e":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}}}}},"s":{"df":0,"docs":{},"o":{"df":0,"docs":{},"l":{"d":{"df":1,"docs":{"1":{"tf":1.0}}},"df":0,"docs":{}},"u":{"df":0,"docs":{},"r":{"c":{"df":1,"docs":{"1":{"tf":1.0}}},"df":0,"docs":{}}}},"t":{"df":0,"docs":{},"r":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"df":0,"docs":{},"g":{"df":1,"docs":{"1":{"tf":1.0}}}}},"u":{"c":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}}},"df":0,"docs":{}}}},"u":{"c":{"df":0,"docs":{},"h":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{},"i":{"df":2,"docs":{"0":{"tf":1.7320508075688772},"1":{"tf":1.7320508075688772}}}},"y":{"df":0,"docs":{},"s":{"df":0,"docs":{},"t":{"df":0,"docs":{},"e":{"df":0,"docs":{},"m":{"df":1,"docs":{"1":{"tf":1.7320508075688772}}}}}}}},"t":{"a":{"df":0,"docs":{},"x":{"df":1,"docs":{"1":{"tf":1.7320508075688772}}}},"df":0,"docs":{},"h":{"a":{"df":0,"docs":{},"n":{"df":0,"docs":{},"k":{"df":1,"docs":{"1":{"tf":1.0}}}}},"df":0,"docs":{},"r":{"df":0,"docs":{},"o":{"df":0,"docs":{},"u":{"df":0,"docs":{},"g":{"df":0,"docs":{},"h":{"df":1,"docs":{"1":{"tf":1.0}}}}}}}},"r":{"a":{"df":0,"docs":{},"n":{"df":0,"docs":{},"s":{"a":{"c":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{}},"df":0,"docs":{},"f":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"_":{"df":0,"docs":{},"p":{"df":0,"docs":{},"o":{"df":0,"docs":{},"l":{"df":0,"docs":{},"i":{"c":{"df":0,"docs":{},"i":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{}}}}}},"df":1,"docs":{"1":{"tf":2.0}},"p":{"df":0,"docs":{},"o":{"df":0,"docs":{},"l":{"df":0,"docs":{},"i":{"c":{"df":0,"docs":{},"i":{"df":1,"docs":{"1":{"tf":2.0}}}},"df":0,"docs":{}}}}},"r":{"df":0,"docs":{},"e":{"df":0,"docs":{},"q":{"df":0,"docs":{},"u":{"df":0,"docs":{},"e":{"df":0,"docs":{},"s":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":3.1622776601683795}}}}}}}}}}}}}}},"df":0,"docs":{}},"y":{"df":0,"docs":{},"p":{"df":0,"docs":{},"e":{"df":2,"docs":{"0":{"tf":1.0},"1":{"tf":1.7320508075688772}}}}}},"u":{"df":0,"docs":{},"n":{"d":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":0,"docs":{},"s":{"df":0,"docs":{},"t":{"a":{"df":0,"docs":{},"n":{"d":{"df":1,"docs":{"1":{"tf":1.0}}},"df":0,"docs":{}}},"df":0,"docs":{}}}}}},"df":0,"docs":{},"l":{"df":0,"docs":{},"e":{"df":0,"docs":{},"s":{"df":0,"docs":{},"s":{"df":1,"docs":{"1":{"tf":1.0}}}}}},"t":{"df":0,"docs":{},"i":{"df":0,"docs":{},"l":{"df":1,"docs":{"1":{"tf":1.0}}}}}},"p":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"df":1,"docs":{"1":{"tf":1.0}}}}},"s":{"df":1,"docs":{"1":{"tf":1.0}}}},"v":{"a":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{}}}},"title":{"root":{"df":0,"docs":{},"k":{"df":0,"docs":{},"i":{"df":0,"docs":{},"o":{"df":0,"docs":{},"s":{"df":0,"docs":{},"k":{"df":1,"docs":{"0":{"tf":1.0}}}}}}},"p":{"df":0,"docs":{},"o":{"df":0,"docs":{},"l":{"df":0,"docs":{},"i":{"c":{"df":0,"docs":{},"i":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{}}}}},"s":{"df":0,"docs":{},"u":{"df":0,"docs":{},"i":{"df":1,"docs":{"0":{"tf":1.0}}}}},"t":{"df":0,"docs":{},"r":{"a":{"df":0,"docs":{},"n":{"df":0,"docs":{},"s":{"df":0,"docs":{},"f":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"1":{"tf":1.0}}}}}}}},"df":0,"docs":{}}}}}},"pipeline":["trimmer","stopWordFilter","stemmer"],"ref":"id","version":"0.9.5"},"results_options":{"limit_results":30,"teaser_word_count":30},"search_options":{"bool":"OR","expand":true,"fields":{"body":{"boost":1},"breadcrumbs":{"boost":1},"title":{"boost":2}}}});
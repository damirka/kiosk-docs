# Multiple Transfer Policies

While most of the scenarios imply having a single `TransferPolicy` for a type, it is possible to create multiple policies for different purposes. For example, a default policy for "VAT" would require everyone to use it. However, if a person is leaving the country, they can get their VAT refunded; is it possible to resolve? The answer is yes, and it is possible to do it without changing the default policy.

To do so, a second `TransferPolicy` for the same type can be issued and usually wrapped into a custom object to implement the logic. For example, a "TaxFreePolicy" object can be created and used to ignore - not pay - VAT. The object will store another `TransferPolicy` which can be accessed only if the buyer shows a valid "Passport" object. The inner policy may contain no rules, therefore not requiring any fees to be paid.

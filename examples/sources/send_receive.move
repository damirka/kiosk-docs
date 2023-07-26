module examples::send_receive {
    

    struct MyType has drop {}

    /// Create a `TransferRequest`. Once received it must be consumed by the
    /// matching `TransferPolicy` - otherwise fails.
    public fun send(): TransferRequest<MyType> {
        transfer_policy::new_request(

        )
    }
}

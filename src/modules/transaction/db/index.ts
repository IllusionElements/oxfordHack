import Transaction from './collection'
import TransactionSchema from './schema'
import "../../../../lib/collection"

Transaction.attachSchema(TransactionSchema)

export default Transaction
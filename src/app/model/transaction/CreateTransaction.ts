import { TypeTransaction } from "../../enums/transaction/TypeTransaction";

export interface CreateTransaction {
  value: number;
  type: TypeTransaction;
}

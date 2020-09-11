import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmaiLValidatorAdapter } from '../../utils/email-validator-adapter'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/accounts'

export const makeSignupController = (): SignUpController => {
  const salt = 12
  const emailValidatorAdapter = new EmaiLValidatorAdapter()
  const bcrypterAdaper = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()

  const dbAddAccount = new DbAddAccount(bcrypterAdaper, accountMongoRepository)
  return new SignUpController(emailValidatorAdapter, dbAddAccount)
}

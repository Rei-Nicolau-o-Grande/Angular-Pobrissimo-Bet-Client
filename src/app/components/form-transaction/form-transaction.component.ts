import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators  } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { TypeTransaction } from '../../enums/transaction/TypeTransaction';
import { TransactionService } from '../../services/transaction/transaction.service';
import { CreateTransaction } from '../../model/transaction/CreateTransaction';
import { UserService } from '../../services/user/user.service';
import { WalletService } from '../../services/wallet/wallet.service';
import { MyWallet } from '../../model/wallet/MyWallet';


@Component({
  selector: 'app-form-transaction',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule
  ],
  templateUrl: './form-transaction.component.html',
  styleUrl: './form-transaction.component.scss'
})
export class FormTransactionComponent implements OnInit {

  private dialogRef = inject(MatDialogRef<HeaderComponent>);
  private matDialogData = inject(MAT_DIALOG_DATA);
  private cookieService = inject(CookieService);
  private transactionService = inject(TransactionService);
  private userService = inject(UserService);
  private myWallet = inject(WalletService);
  private myWalletUserId: number = 0;
  public myWalletModel: MyWallet = {} as MyWallet;



  public formTransaction = new FormGroup({
    value: new FormControl('', [Validators.required, Validators.min(1)]),
    type: new FormControl('', [Validators.required]),
  });

  typeTransaction = TypeTransaction;
  selectedTransaction: TypeTransaction | undefined;

  transactionLabels: { [key in TypeTransaction]: string } = {
    [TypeTransaction.DEPOSIT]: 'Depósito',
    [TypeTransaction.WITHDRAW]: 'Saque',
  };

  get typeTransactionValues(): TypeTransaction[] {
    return Object.values(this.typeTransaction) as TypeTransaction[];
  }

  public getWalletId(): void {
    this.myWallet.getWallet(this.myWalletModel)
    .subscribe((response) => {
      this.myWalletUserId = response.id;
    });
  }

  public onCreatedTransactionSubmit(): void {
    if (this.formTransaction.valid && this.formTransaction.value) {
      this.transactionService.createTransaction(this.formTransaction.value as CreateTransaction, this.myWalletUserId)
        .subscribe(() => {
          this.dialogRef.close();
        });
    }
  }

  ngOnInit(): void {
    this.getWalletId();
  }

}

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
import { MatSnackBarModule, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';


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
    MatSelectModule,
    MatSnackBarModule
  ],
  templateUrl: './form-transaction.component.html',
  styleUrl: './form-transaction.component.scss'
})
export class FormTransactionComponent implements OnInit {

  private snackBar = inject(MatSnackBar);
  private dialogRef = inject(MatDialogRef<HeaderComponent>);
  private matDialogData = inject(MAT_DIALOG_DATA);
  private cookieService = inject(CookieService);
  private transactionService = inject(TransactionService);
  private userService = inject(UserService);
  private walletService = inject(WalletService);
  public myWalletModel: MyWallet = {} as MyWallet;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';



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

  public getWallet(): void {
    this.walletService.getWallet()
    .subscribe((response) => {
      this.myWalletModel = response;
    });
  }

  public handleCloseModalTransaction(): void {
    this.dialogRef.close();
  }

  public onCreatedTransactionSubmit(): void {
  if (this.formTransaction.valid && this.formTransaction.value) {
    this.transactionService.createTransaction(this.formTransaction.value as CreateTransaction, this.myWalletModel.id)
      .subscribe({
        next: () => {
          this.snackBar.open('Transação criada com sucesso', 'Fechar', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.handleCloseModalTransaction();
        },
        error: (error) => {
          this.snackBar.open(error.error.message, 'Fechar', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      });
    }
  }

  ngOnInit(): void {
    this.getWallet();
  }

}

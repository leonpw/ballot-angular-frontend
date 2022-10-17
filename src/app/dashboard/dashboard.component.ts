import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  walletAddress: string;
  wallet: ethers.Wallet | undefined;
  etherBalance: string;
  provider: ethers.providers.BaseProvider;
  totalSupply: String;

  privateKey: string;
  connected: string;
  proposal: string;
  amountVote: string;
  delegateAddress: string;
  apiService: ApiService;

  constructor(apiService: ApiService) {
    this.provider = ethers.getDefaultProvider('goerli');
    this.walletAddress = 'Please login with your private key first';
    this.etherBalance = '...';

    this.privateKey = '';
    this.proposal = '';
    this.amountVote = '';
    this.delegateAddress = '';
    this.connected = '';

    this.totalSupply = 'Loading...';
    this.apiService = apiService;
  }

  ngOnInit(): void {
    this.apiService.getTotalSupply().subscribe((response) => {
      this.totalSupply = response;
    });
  }

  private updateBalance() {
    this.provider.getBalance(this.walletAddress).then((balanceBN) => {
      this.etherBalance = ethers.utils.formatEther(balanceBN) + ' ETH';
    });
  }

  onKeyUp(event: any) {
    console.log('Trying to login with: ' + event.target.value);
    this.privateKey = event.target.value;
  }

  onChangeDelegateAddress(event: any) {
    this.delegateAddress = event.target.value;
  }

  submitDelegate() {
    if (this.delegateAddress) {
      this.apiService
        .delegateVotingPower({
          to: this.delegateAddress,
        })
        .subscribe((response) => {
          console.log(response);
        });
    }
  }

  onChangeProposal(event: any) {
    this.proposal = event.target.value;
  }

  onChangeAmountVote(event: any) {
    this.amountVote = event.target.value;
  }

  submitVote() {
    if (this.amountVote && this.proposal) {
      this.apiService
        .castVote({
          proposal: this.proposal,
          amount: this.amountVote,
        })
        .subscribe((response) => {
          console.log(response);
        });
    }
  }

  login() {
    this.wallet = new ethers.Wallet(this.privateKey);
    this.walletAddress = this.wallet.address;
    this.updateBalance();
  }
}

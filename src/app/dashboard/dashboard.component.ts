import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    walletAddress: string;
    wallet: ethers.Wallet | undefined;
    etherBalance: string;
    provider: ethers.providers.BaseProvider;

    privateKey: string;

    constructor() {
        this.provider = ethers.getDefaultProvider('goerli');
        this.walletAddress = 'Please login with your private key first';
        this.etherBalance = "...";

        this.privateKey = '';

    }

    ngOnInit(): void {

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

    login() {
        this.wallet = new ethers.Wallet(this.privateKey);
        this.walletAddress = this.wallet.address;
        this.updateBalance();
    }

}

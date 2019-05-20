import { Component, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { ArticleService } from 'src/app/Services/store/article.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {
  showSuccess;
  article;
  sum;
  public payPalConfig?: IPayPalConfig
  constructor(
    private articleService: ArticleService,
    private title: Title
  ) { 
    this.title.setTitle("CF Pago");
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'MXN',
      clientId: 'Ab9cqSKQONbMS81nzRW-0X4WHvw7a0O6l2cEvEDVxkryGU2NI-5PmNQkLH-GNd-mgP6OjLXn9WUtWb5E',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'MXN',
              value: this.sum,
              breakdown: {
                item_total: {
                  currency_code: 'MXN',
                  value: this.sum
                }
              }
            },
            items: [
              // {
              //   name: 'Enterprise Subscription',
              //   quantity: '1',
              //   category: 'DIGITAL_GOODS',
              //   unit_amount: {
              //     currency_code: 'MXN',
              //     value: '9.99',
              //   },
              // }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
      },
      onError: err => {
        console.log('OnError', err);
      },

    };
  }

  findmany() {
    this.articleService.findMany({ all: JSON.parse(localStorage.getItem("avct_item")) }).subscribe(data => {
      this.article = data.articles;
      this.sum = this.article.reduce((acc, obj) => acc + obj.price, 0);
    })
  }

  ngOnInit() {
    this.initConfig();
    this.findmany();
  }

}

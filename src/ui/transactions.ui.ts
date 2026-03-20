'use strict';

import { Transaction } from '../models/transaction.model';
import { TransactionService } from '../services/transaction.service';

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(value);
}

function formatDate(isoDate: string): string {
  const d: any = new Date(isoDate + 'T00:00:00');
  return d.toLocaleDateString('it-IT', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function renderRows(list: Transaction[]): void {
  const tbody: any = document.getElementById('transactionsBody');
  if (!tbody) return;

  if (!list || list.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="4" class="state-empty">Nessuna transazione trovata.</td></tr>';
    return;
  }

  tbody.innerHTML = list
    .map((tx: any) => {
      const isCredit: any = tx.type === 'credit';
      const sign: any      = isCredit ? '+' : '-';
      const cssClass: any  = isCredit ? 'amount--credit' : 'amount--debit';
      const formatted: any = formatCurrency(tx.amount);
      return `
        <tr>
          <td style="color:var(--muted);font-size:13px">${formatDate(tx.date)}</td>
          <td>${tx.description}</td>
          <td><span class="badge">${tx.category}</span></td>
          <td style="text-align:right" class="${cssClass}">${sign}${formatted}</td>
        </tr>`;
    })
    .join('');
}

export function initTransactionsUI(service: TransactionService): void {
  const transactions: Transaction[] = service.getAll();
  renderRows(transactions);

  const searchInput = document.getElementById('searchInput') as HTMLInputElement | null;
  if (searchInput) {
    searchInput.addEventListener('input', (e: Event) => {
    const target = e.target as HTMLInputElement;
    const query = target.value;
    const results = service.search(query);
    renderRows(results);
});

  }

  const balanceEl = document.getElementById('balance') as HTMLElement | null;
  if (balanceEl) {
    const balance: any = service.getBalance();
    balanceEl.textContent = formatCurrency(balance);
  }
}

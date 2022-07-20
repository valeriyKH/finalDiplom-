/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
     this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const currentUser = User.current();
    const select = this.element.querySelector('.accounts-select');
    let selectAccounts ='';

    if (currentUser) {
      Account.list(currentUser, (err, response) => {
        if (response && response.success) {
          response.data.forEach(item => {
            selectAccounts += `
              <option value="${item.id}">${item.name}</option>
            `
          });
          select.innerHTML = selectAccounts;
        };
      });
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    const callback = (error) => {
      if (error) {
        handleError(error);
      } else {
        this.element.reset();
        if (App.getModal('newIncome')) {
          App.getModal('newIncome').close();
        }
        if (App.getModal('newExpense')) {
          App.getModal('newExpense').close();
        }
        App.getWidget("accounts").update();
        App.getPage("transactions").update();
      }
    }
    Transaction.create(data, callback);
  }
}
var users = [
    {
        firstname: 'Ivan',
        lastname: 'Ivanovich',
        patronymic: 'Ivanov',
        birth: new Date('1989-01-14'),
        passportData: {
            series: 2312,
            number: 25949131,
        },
        bill: [{
            billNumber: 84398632,
            openDate: new Date('2017-05-12'),
            firstContrib: 100092,
            percentageRate: 10,
        },
        {
            billNumber: 645642342,
            openDate: new Date('2017-01-18'),
            firstContrib: 50231,
            percentageRate: 14,
        }],
    },

    {
        firstname: 'Roman',
        lastname: 'Romanovich',
        patronymic: 'Romanov',
        birth: new Date('1989-01-14'),
        passportData: {
            series: 3216,
            number: 93627626,
        },
        bill: [{
            billNumber: 12421123,
            openDate: new Date('2017-02-01'),
            firstContrib: 32012,
            percentageRate: 16,
        },
        {
            billNumber: 532768657,
            openDate: new Date('2017-02-25'),
            firstContrib: 23123,
            percentageRate: 18,
        }],
    },

    {
        firstname: 'Petr',
        lastname: 'Petorovich',
        patronymic: 'Petrov',
        birth: new Date('2017-01-18'),
        passportData: {
            series: 5371,
            number: 837619017,
        },
        bill: [{
            billNumber: 5235234243,
            openDate: new Date('2017-09-01'),
            firstContrib: 23567,
            percentageRate: 11,
        },
        {
            billNumber: 1235436312,
            openDate: new Date('2017-01-18'),
            firstContrib: 98763,
            percentageRate: 13,
        }],
    }
]

var userList = document.createElement('div');
userList.className = 'user-list';
document.querySelector('body').appendChild(userList);

function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
};

for (var key in users) {
    var user = document.createElement('div');
    user.className = 'user';
    var { firstname, lastname, patronymic, birth, passportData, bill } = users[key];
    userList.appendChild(user).innerHTML = `<strong>${patronymic} ${firstname} ${lastname}</strong>
    <p>Дата рождения: ${birth.toLocaleDateString('ru-Ru')}</p>
    <p>Паспортные данные: ${passportData.series} ${passportData.number}</p>`;
    var currentUser = document.createElement('div');
    currentUser.className = 'current-user';
    var button = document.createElement('button');
    button.className = 'btn';
    button.innerHTML = 'Показать информацию';
    button.addEventListener('click', function (e) {
        var pd = e.target.parentElement.childNodes[1];
        if (pd.className === 'hidden') {
            pd.className = 'visible';
        } else {
            pd.className = 'hidden';
        }
    });
    currentUser.appendChild(button);
    var props = document.createElement('div');
    props.className = 'hidden';
    currentUser.appendChild(props);
    for (var keykey in bill) {
        var { billNumber, openDate, firstContrib, percentageRate } = bill[keykey];
        var capitalization = Math.pow((1 + percentageRate / 1200), monthDiff(openDate, new Date()));
        props.innerHTML += `<div class="bill"><p>Номер счета: ${billNumber}</p>
        <p>Дата открытия счета: ${openDate.toLocaleDateString('ru-Ru')}</p>
        <p>Первоначальный взнос: ${firstContrib}</p>
        <p>Процентная ставка: ${percentageRate}</p>
        <p>Капитализация: ${Math.ceil(capitalization * firstContrib)}</p></div>`;
    };
    user.appendChild(currentUser);
};
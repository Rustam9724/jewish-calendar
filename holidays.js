/*******************************************************
holydays in russian

public:
* getHolyday(day, month, weekday, daysInYear)

browser-dependent:no language-dependent:yes
*******************************************************/

/* holydays */

/* uses CONSTANTS defined in jcalendar.js */
/* browser-dependent:no language-dependent:yes */

	// 3 subroutines of getHolyday() - holyday, important date, additional information
    function hol(txt, ref)
    {	return ref==null?
            ('<font color=red>' + txt + '</font>')
        :
            ('<a href="'+ref+'" target="_blank" style="color: red">' + txt + '</a>');
    }
    function imp(txt, ref)
    {	return ref==null?
            ('<font color=#940606>' + txt + '</font>')
        :
            ('<a href="'+ref+'" target="_blank" style="color: #940606">' + txt + '</a>');
    }
    function inf(txt, ref)
    {	return ref==null?
            ('<font color=#940606 size="-2">' + txt + '</font>')
        :
            ('<font size="-2"><a href="'+ref+'" target="_blank" style="color: #940606">' + txt + '</a></font>');
    }
    
    function getHolyday(day, month, weekday, daysInYear)
    {	var M = 100;
    
        switch( day + month * M )
        {
    
        case  1 + NISAN * M: return inf('Рош ходеш');
        case 10 + NISAN * M: return weekday==SAT? inf('Шабат hа-Гадоль') : ('');
        case 12 + NISAN * M: return weekday==SAT? inf('Шабат hа-Гадоль') : ('');
        case 14 + NISAN * M: return (weekday==SAT? inf('Шабат hа-Гадоль') + '<br>' : ('')) + inf('Пост первенцев') + '<br>' + inf('канун Песаха');
        case 15 + NISAN * M: return hol('Песах', '#');
        case 16 + NISAN * M: return imp('праздничные будни') + '<br>' + inf('диаспора: 2-й день Песаха') + '<br>' + inf('1-й день Омера');
        case 17 + NISAN * M: return imp('праздничные будни') + '<br>' + inf('2-й день Омера');
        case 18 + NISAN * M: return imp('праздничные будни') + '<br>' + inf('3-й день Омера');
        case 19 + NISAN * M: return imp('праздничные будни') + '<br>' + inf('4-й день Омера');
        case 20 + NISAN * M: return imp('праздничные будни') + '<br>' + inf('5-й день Омера');
        case 21 + NISAN * M: return hol('Седьмой день Песаха') + '<br>' + inf('6-й день Омера');
        case 22 + NISAN * M: return inf('диаспора: последний день Песаха') + '<br>' + inf('7й день Омера');
        case 23 + NISAN * M: return inf('8-й день Омера');
        case 24 + NISAN * M: return inf('9-й день Омера');
        case 25 + NISAN * M: return inf('10-й день Омера');
        case 26 + NISAN * M: return inf('11-й день Омера');
        case 27 + NISAN * M: return imp('День катастрофы') + '<br>' + inf('12-й день Омера');
        case 28 + NISAN * M: return inf('13-й день Омера');
        case 29 + NISAN * M: return inf('14-й день Омера');
        case 30 + NISAN * M: return inf('Рош ходеш месяца Ияр (1)') + '<br>' + inf('15-й день Омера');
    
        case  1 + IYAR * M: return inf('Рош ходеш (2)') + '<br>' + inf('16-й день Омера');
        case  2 + IYAR * M: return inf('17-й день Омера');
        case  3 + IYAR * M: return inf('18-й день Омера');
        case  4 + IYAR * M: return imp('День памяти') + '<br>' + inf('19-й день Омера');
        case  5 + IYAR * M: return hol('День независимости') + '<br>' + inf('20-й день Омера');
        case  6 + IYAR * M: return inf('21-й день Омера');
        case  7 + IYAR * M: return inf('22-й день Омера');
        case  8 + IYAR * M: return inf('23-й день Омера');
        case  9 + IYAR * M: return inf('24-й день Омера');
        case 10 + IYAR * M: return inf('25-й день Омера');
        case 11 + IYAR * M: return inf('26-й день Омера');
        case 12 + IYAR * M: return inf('27-й день Омера');
        case 13 + IYAR * M: return inf('28-й день Омера');
        case 14 + IYAR * M: return inf('29-й день Омера');
        case 15 + IYAR * M: return inf('30-й день Омера');
        case 16 + IYAR * M: return inf('31-й день Омера');
        case 17 + IYAR * M: return inf('32-й день Омера');
        case 18 + IYAR * M: return hol('Лаг ба-Омер') + '<br>' + inf('33-й день Омера');
        case 19 + IYAR * M: return inf('34-й день Омера');
        case 20 + IYAR * M: return inf('35-й день Омера');
        case 21 + IYAR * M: return inf('36-й день Омера');
        case 22 + IYAR * M: return inf('37-й день Омера');
        case 23 + IYAR * M: return inf('38-й день Омера');
        case 24 + IYAR * M: return inf('39-й день Омера');
        case 25 + IYAR * M: return inf('40-й день Омера');
        case 26 + IYAR * M: return inf('41-й день Омера');
        case 27 + IYAR * M: return inf('42-й день Омера');
        case 28 + IYAR * M: return hol('День Иерусалима') + '<br>' + inf('43-й день Омера');
        case 29 + IYAR * M: return inf('44-й день Омера');
    
        case  1 + SIVAN * M: return inf('Рош ходеш') + '<br>' + inf('45-й день Омера');
        case  2 + SIVAN * M: return inf('46-й день Омера');
        case  3 + SIVAN * M: return inf('47-й день Омера');
        case  4 + SIVAN * M: return inf('48-й день Омера');
        case  5 + SIVAN * M: return inf('канун Шавуот') + '<br>' + inf('49-й день Омера');
        case  6 + SIVAN * M: return hol('Шавуот');
        case  7 + SIVAN * M: return inf('диаспора: 2-й день Шавуот');
        case 30 + SIVAN * M: return inf('Рош ходеш месяца Таммуз (1)');
    
        case  1 + TAMUZ * M: return inf('Рош ходеш (2)');
        case 17 + TAMUZ * M: return hol('Пост 17 Таммуза');
    
        case  1 + AV * M: return inf('Рош ходеш');
        case  9 + AV * M: return imp('Пост 9-Ава');
        case 30 + AV * M: return inf('Рош ходеш месяца Элуль (1)');
    
        case  1 + ELUL * M: return inf('Рош ходеш (2)');
        case 25 + ELUL * M: return inf('День сотворения мира');
        case 29 + ELUL * M: return inf('канун Рош hа-Шана');
    
        case  1 + TISHREY * M: return hol('Рош hа-Шана') + '<br>' + inf('1-й день раскаяния');
        case  2 + TISHREY * M: return hol('Рош hа-Шана') + '<br>' + inf('2-й день раскаяния');
        case  3 + TISHREY * M: return imp('Пост Гедалии') + ( weekday==SAT? '<br>'+inf('Шабат шува') : ('') ) + '<br>' + inf('3-й день раскаяния');
        case  4 + TISHREY * M: return hol('Пост Гедальи') + '<br>' + inf('4-й день раскаяния');
        case  5 + TISHREY * M: return ( weekday==SAT? inf('Шабат шува')+'<br>' : ('') ) + inf('5-й день раскаяния');
        case  6 + TISHREY * M: return ( weekday==SAT? inf('Шабат шува')+'<br>' : ('') ) + inf('6-й день раскаяния');
        case  7 + TISHREY * M: return inf('7-й день раскаяния');
        case  8 + TISHREY * M: return ( weekday==SAT? inf('Шабат шува')+'<br>' : ('') ) + inf('8-й день раскаяния');
        case  9 + TISHREY * M: return inf('канун Йом-Кипур') + '<br>' + inf('9-й день раскаяния');
        case 10 + TISHREY * M: return imp('Йом-Кипур') + '<br>' + inf('10-й день раскаяния');
        case 14 + TISHREY * M: return inf('канун Суккот');
        case 15 + TISHREY * M: return hol('Суккот');
        case 16 + TISHREY * M: return imp('праздничные будни') + '<br>' + inf('диаспора: 2-й день Суккот');
        case 17 + TISHREY * M: return imp('праздничные будни');
        case 18 + TISHREY * M: return imp('праздничные будни');
        case 19 + TISHREY * M: return imp('праздничные будни');
        case 20 + TISHREY * M: return imp('праздничные будни');
        case 21 + TISHREY * M: return hol('hошана Раба');
        case 22 + TISHREY * M: return hol('Шмини Ацерет');
        case 23 + TISHREY * M: return inf('диаспора: 2-й день Шмини Ацерет и Симхат Тора');
        case 30 + TISHREY * M: return inf('Рош ходеш месяца Хешван (1)');
    
        case  1 + HHESHVAN * M: return inf('Рош ходеш (2)');
        case 30 + HHESHVAN * M: return inf('Рош ходеш месяца Кислев (1)');
    
        case  1 + KISLEV * M: return daysInYear%10==5? inf('Рош ходеш (2)') : inf('Рош ходеш');
        case 25 + KISLEV * M: return hol('Ханука - 1 свеча');
        case 26 + KISLEV * M: return hol('Ханука - 2 свеча');
        case 27 + KISLEV * M: return hol('Ханука - 3 свеча');
        case 28 + KISLEV * M: return hol('Ханука - 4 свеча');
        case 29 + KISLEV * M: return hol('Ханука - 5 свеча');
        case 30 + KISLEV * M: return hol('Ханука - 6 свеча') + '<br>' + inf('Рош ходеш месяца Тевет (1)'); //if kislev has 30 days
    
        case  1 + TEVET * M: return daysInYear%10==3? hol('Ханука - 6 свеча') + '<br>' + inf('Рош ходеш') : hol('Ханука - 7 свеча') + '<br>' + inf('Рош ходеш (2)');
        case  2 + TEVET * M: return daysInYear%10==3? hol('Ханука - 7 свеча') : hol('Ханука - 8 свеча');
        case  3 + TEVET * M: return daysInYear%10==3? hol('Ханука - 8 свеча') : ('');
        case 10 + TEVET * M: return inf('Пост 10 Тевета');
    
        case  1 + SHEVAT * M: return inf('Рош ходеш');
        case 15 + SHEVAT * M: return hol('Ту би-Шват');
        case 30 + SHEVAT * M: return inf('Рош ходеш месяца Адар (1)');
    
        case  1 + ADAR   * M: return inf('Рош ходеш (2)');
        case  7 + ADAR   * M: return daysInYear>380? ('') : ( hol('День рождения и смерти Мошэ Рабэйну') );
        case  8 + ADAR   * M: return daysInYear>380? ('') : ( weekday==SAT? inf('Паршат захор') : ('') );
        case  9 + ADAR   * M: return daysInYear>380? ('') : ( weekday==SAT? inf('Паршат захор') : ('') );
        case 11 + ADAR   * M: return daysInYear>380? ('') : ( ( weekday==SAT? inf('Паршат захор') : ('') ) + ( weekday==THU? inf('Пост Эстер') : ('') ) );
        case 13 + ADAR   * M: return daysInYear>380? ('') : ( weekday==SAT? inf('Паршат захор')+'<br>'+inf('Пост Эстер перенесён') : inf('Пост Эстер') );
        case 14 + ADAR   * M: return daysInYear>380? ('') : ( hol('Пурим') );
        case 15 + ADAR   * M: return daysInYear>380? ('') : ( hol('Шушан Пурим') );
        case 30 + ADAR   * M: return inf('Рош ходеш месяца Адар Бэт (1)'); // there is Adar Bet (because Adar has 30 days)
    
        case  1 + ADAR_2 * M: return inf('Рош ходеш (2)');
        case  7 + ADAR_2 * M: return hol('День рождения и смерти Мошэ Рабэйну');
        case  8 + ADAR_2 * M: return weekday==SAT? inf('Паршат захор') : ('');
        case  9 + ADAR_2 * M: return weekday==SAT? inf('Паршат захор') : ('');
        case 11 + ADAR_2 * M: return ( weekday==SAT? inf('Паршат захор') : ('') ) + ( weekday==THU? inf('Пост Эстер') : ('') );
        case 13 + ADAR_2 * M: return weekday==SAT? inf('Паршат захор')+'<br>'+inf('Пост Эстер перенесён') : inf('Пост Эстер');
        case 14 + ADAR_2 * M: return hol('Пурим');
        case 15 + ADAR_2 * M: return hol('Шушан Пурим');
    
        default: return '';
    
        }
    }
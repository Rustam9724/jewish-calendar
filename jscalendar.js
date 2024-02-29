/*******************************************************
jewish calendar calculation

public:
* (constants) SUN,MON,... ; NISAN,IYAR,...
* JCalendar type

browser-dependent:no language-dependent:no
author: Jeremiah Shaulov
last updated 17 May 2003 22:58 GMT
*******************************************************/

/* PUBLIC CONSTANTS */

var SUN=0,MON=1,TUE=2,WED=3,THU=4,FRI=5,SAT=6;
var NISAN=1,IYAR=2,SIVAN=3,TAMUZ=4,AV=5,ELUL=6,TISHREY=7,HHESHVAN=8,KISLEV=9,TEVET=10,SHEVAT=11,ADAR=12,ADAR_2=13;

/* PRIVATE CONSTANTS */

var _MOLAD_CONSTANT = ( (29)*24*60*60 + (12)*60*60 + (44)*60 + (1)*60/18 ) * 1000; // msec

var _REFERENCE = new Object(); // FIXED MOMENT
{	_REFERENCE.year = 5763;
	_REFERENCE.molad = new Date(2002, 8, 7, 18, 54, 34);    // Sat, 7th of September 2002, 18:54:34
	_REFERENCE.roshHaShana = new Date(2002, 8, 7, 0, 0, 0); // Sat, 7th of September 2002, 00:00:00
}

/*|____________________________________________________________________|*|
|              private functions that realize calculation                |
|                     of the jewish calendar                             |
|                                                                        |
| - getYearInfo(year)                                                    |
|     get the following data on given jewish year:                       |
|     1) Gregorian date of molad ("molad" == "new moon")                 |
|     2) Gregorian date of rosh ha shana ("rosh ha shana" == "new year") |
|     3) count of days in this jewish year (353,354,355,383,384,385)     |
|     4) count of months in this year (12, 13)                           |
|     5) position of this year in shmita period                          |
|        (1 => 1st year after shmita, 2 => 2nd, ...7 => shmita)          |
|                                                                        |
| - countDaysInMonth(month, daysInYear)                                  |
|     returns count of days in given jewish month;                       |
|     for example: Tishrey has 30 days, Hheshvan - 29 or 30              |
|                  (depending on count of days in year)...               |
|                                                                        |
| - getDateOf1stDay(dateOf1stTishrey, month, daysInYear)                 |
|     returns date (object of type Date) of 1st day of given jewish      |
|     month; for example: 1st Hheshvan = dateOf1stTishrey + 30 days      |
|                                                                        |
| - gregToJewish(date)                                                   |
|     returns jewish {year, month, day} corresponding to                 |
|     given gregorian date                                               |
|                                                                        |
|*|____________________________________________________________________|*/

	// this is subroutine of getYearInfo()
function countMonthsInYear(year)
{	switch( year % 19 )
	{	case  3:
		case  6:
		case  8:
		case 11:
		case 14:
		case 17:
		case  0: return 13;

		default: return 12;
	}
}

	// this is subroutine of getYearInfo()
	// date1 - date of molad, date2 - assumed date of rosh ha shana
	// returns true if assumed date of rosh ha shana is possible i.e. follows after molad
function specialCompare(date1, date2)
{	if( date2.getMonth() < date1.getMonth() ) return false;
	if( date2.getMonth() > date1.getMonth() ) return true;
	if( date2.getDate()  < date1.getDate()  ) return false;
	return true;
}

	// get the following data on given jewish year:
	// 1) Gregorian date of molad ("molad" == "new moon")
	// 2) Gregorian date of rosh ha shana ("rosh ha shana" == "new year")
	// 3) count of days in this jewish year (353, 354, 355, 383, 384, 385)
	// 4) count of months in this year (12, 13)
	// 5) position of this year in shmita period (1 => 1st year after shmita, 2 => 2nd, ...7 => shmita)
function getYearInfo(year)
{	/* Object to return */
	var result = new Object();
	{	result.molad = null;
		result.roshHaShana = null;
		result.days = null;
		result.months = null;
		result.shmita = null;
	}

	/* 1. compution of result.molad, result.roshHaShana, result.days */

	var floatingYear = new Object();
	{	floatingYear.year = _REFERENCE.year;
		floatingYear.months = countMonthsInYear(_REFERENCE.year);
		floatingYear.molad = _REFERENCE.molad;
		floatingYear.roshHaShana = _REFERENCE.roshHaShana;
	}

	/* if( floatingYear.year <= year ) */

	while( floatingYear.year <= year ) // floatingYear floats from _REFERENCE.year up to year
	{	var nextMonths = countMonthsInYear(floatingYear.year+1);
		var nextMolad = new Date(floatingYear.molad.getTime()+floatingYear.months*_MOLAD_CONSTANT);

		var daysInYear;
		var nextRoshHaShana;
		var day; // == nextRoshHaShana.getDay() / stam

		assume_incomplete: // naneahh hhasera
		{	daysInYear = floatingYear.months==12? 353 : 383;
			nextRoshHaShana = new Date( floatingYear.roshHaShana.getTime() + daysInYear*24*60*60*1000 );
			day = nextRoshHaShana.getDay();

			if( !specialCompare(nextMolad, nextRoshHaShana) )
				break assume_incomplete;
			if( day==SUN || day==WED || day==FRI )
				break assume_incomplete;
			if( nextMonths==12 && (day==TUE || day==THU) )
			{	// look one year further
				var daysInNextYear = nextMonths==12? 354 : 384;
				if( day == THU ) daysInNextYear++;
				var afterNextRoshHaShana = new Date( nextRoshHaShana.getTime() + daysInNextYear*24*60*60*1000 );
				var afterNextMolad = new Date(nextMolad.getTime()+nextMonths*_MOLAD_CONSTANT);
				if( !specialCompare(afterNextMolad, afterNextRoshHaShana) )
					break assume_incomplete;
			}

			// assumption OK

			// result is updated in each cycle of "while"
			result.molad = floatingYear.molad;
			result.roshHaShana = floatingYear.roshHaShana;
			result.days = daysInYear;

			floatingYear.year++;
			floatingYear.months = nextMonths;
			floatingYear.molad = nextMolad;
			floatingYear.roshHaShana = nextRoshHaShana;
			continue;
		}

		assume_in_order: // naneahh kesidran
		{	daysInYear++;
			nextRoshHaShana = new Date( nextRoshHaShana.getTime() + 24*60*60*1000 );
			day = ++day % 7;

			if( !specialCompare(nextMolad, nextRoshHaShana) )
				break assume_in_order;
			if( day==SUN || day==WED || day==FRI )
				break assume_in_order;

			// assumption OK

			// result is updated in each cycle of "while"
			result.molad = floatingYear.molad;
			result.roshHaShana = floatingYear.roshHaShana;
			result.days = daysInYear;

			floatingYear.year++;
			floatingYear.months = nextMonths;
			floatingYear.molad = nextMolad;
			floatingYear.roshHaShana = nextRoshHaShana;
			continue;
		}

		assume_complete: // naneahh shlema
		{	daysInYear++;
			nextRoshHaShana = new Date( nextRoshHaShana.getTime() + 24*60*60*1000 );
			day = ++day % 7;

			if( !specialCompare(nextMolad, nextRoshHaShana) )
				break assume_complete;
			if( day==SUN || day==WED || day==FRI )
				break assume_complete;

			// assumption OK

			// result is updated in each cycle of "while"
			result.molad = floatingYear.molad;
			result.roshHaShana = floatingYear.roshHaShana;
			result.days = daysInYear;

			floatingYear.year++;
			floatingYear.months = nextMonths;
			floatingYear.molad = nextMolad;
			floatingYear.roshHaShana = nextRoshHaShana;
			continue;
		}

		alert("Error found in calculating module.");
		return result;
	}

	/* if( floatingYear.year > year ) */

	while( floatingYear.year > year ) // floatingYear floats from _REFERENCE.year down to year-1
	{	var prevMonths = countMonthsInYear(floatingYear.year-1);
		var beforePrevMonths = countMonthsInYear(floatingYear.year-2);
		var prevMolad = new Date(floatingYear.molad.getTime()-prevMonths*_MOLAD_CONSTANT);

		var daysInPrevYear;
		var prevRoshHaShana;
		var day; // == prevRoshHaShana.getDay() / stam

		assume_prev_complete: // naneahh shana she avra hi shlema
		{	daysInPrevYear = prevMonths==12? 355 : 385;
			prevRoshHaShana = new Date( floatingYear.roshHaShana.getTime() - daysInPrevYear*24*60*60*1000 );
			day = prevRoshHaShana.getDay();

			if( !specialCompare(prevMolad, prevRoshHaShana) )
				break assume_prev_complete;
			if( day==SUN || day==WED || day==FRI )
				break assume_prev_complete;
			if( beforePrevMonths==13 && day==MON )
			{	// look one year further
				var daysInBeforePrevYear = 384;
				var beforePrevRoshHaShana = new Date( prevRoshHaShana.getTime() - daysInBeforePrevYear*24*60*60*1000 );
				var beforePrevMolad = new Date(prevMolad.getTime()-beforePrevMonths*_MOLAD_CONSTANT);
				if( !specialCompare(beforePrevMolad, beforePrevRoshHaShana) )
					break assume_prev_complete;
			}

			// assumption OK

			// result is updated in each cycle of "while"
			result.molad = prevMolad;
			result.roshHaShana = prevRoshHaShana;
			result.days = daysInPrevYear;

			floatingYear.year--;
			floatingYear.months = prevMonths;
			floatingYear.molad = prevMolad;
			floatingYear.roshHaShana = prevRoshHaShana;
			continue;
		}

		assume_prev_in_order: // naneahh shana she avra hi kesidran
		{	daysInPrevYear--;
			prevRoshHaShana = new Date( prevRoshHaShana.getTime() + 24*60*60*1000 );
			day = ++day % 7;

			if( !specialCompare(prevMolad, prevRoshHaShana) )
				break assume_prev_in_order;
			if( day==SUN || day==WED || day==FRI )
				break assume_prev_in_order;

			// assumption OK

			// result is updated in each cycle of "while"
			result.molad = prevMolad;
			result.roshHaShana = prevRoshHaShana;
			result.days = daysInPrevYear;

			floatingYear.year--;
			floatingYear.months = prevMonths;
			floatingYear.molad = prevMolad;
			floatingYear.roshHaShana = prevRoshHaShana;
			continue;
		}

		assume_prev_incomplete: // naneahh shana she avra hi hhasera
		{	daysInPrevYear--;
			prevRoshHaShana = new Date( prevRoshHaShana.getTime() + 24*60*60*1000 );
			day = ++day % 7;

			if( !specialCompare(prevMolad, prevRoshHaShana) )
				break assume_prev_incomplete;
			if( day==SUN || day==WED || day==FRI )
				break assume_prev_incomplete;

			// assumption OK

			// result is updated in each cycle of "while"
			result.molad = prevMolad;
			result.roshHaShana = prevRoshHaShana;
			result.days = daysInPrevYear;

			floatingYear.year--;
			floatingYear.months = prevMonths;
			floatingYear.molad = prevMolad;
			floatingYear.roshHaShana = prevRoshHaShana;
			continue;
		}

		alert("Error found in calculating module.");
		return result;
	}

	/* 2. compution of result.months, result.shmita */

	result.months = result.days>380? 13 : 12;
	result.shmita = year%7==0? 7 : year%7;
	if(result.shmita < 0) result.shmita += 7;

	/* done */

	return result;
}

function countDaysInMonth(month, daysInYear) // it depends on count of days in year
{	switch( month )
	{

	case HHESHVAN:
		return daysInYear%10==5? 30 : 29; // if shlema then 30 else 29
	case KISLEV:
		return daysInYear%10>=4? 30 : 29; // if kesidran or shlema then 30 else 29
	case ADAR:
		return daysInYear>380? 30 : 29; // if this year is leap then 30 else 29
	case ADAR_2:
		return 29; // this year is leap
	default:
		return 29 + month%2; // normally each odd month contains 30 days, even - 29

	}
}

	// returns Gregorian date of 1st day of given month
function getDateOf1stDay(dateOf1stTishrey, month, daysInYear)
{	var resultTime = dateOf1stTishrey.getTime();

	if( month >= TISHREY )
	{	for(var i=TISHREY; i<month; i++)
		{	resultTime += countDaysInMonth(i, daysInYear)*24*60*60*1000;
		}
	}	else
	{	for(var i=TISHREY; i<=(daysInYear>380? ADAR_2 : ADAR); i++)
		{	resultTime += countDaysInMonth(i, daysInYear)*24*60*60*1000;
		}
		for(var i=NISAN; i<month; i++)
		{	resultTime += countDaysInMonth(i, daysInYear)*24*60*60*1000;
		}
	}

	return new Date(resultTime);
}

	// converts Gregorian {year, month, day} to Jewish
function gregToJewish(date)
{	var result = new Object();
	{	result.year = null;		// jewish year
		result.month = null;	// jewish month
		result.day = null;		// day of month
	}

	var possibilities = new Array();
	{	var y = _REFERENCE.year + ( date.getFullYear() - _REFERENCE.roshHaShana.getFullYear() );
		/* need to check two following cases that are possible: y-1 and y */
		possibilities[0] = y-1;
		possibilities[1] = y;
	}

	for(var i=0; i<possibilities.length; i++)
	{	var yi = getYearInfo( possibilities[i] );
		var floatingTime = yi.roshHaShana.getTime();

		for(var month=TISHREY; month<=(yi.months==12? ADAR : ADAR_2); month++)
		{	var temp = floatingTime;
			floatingTime += countDaysInMonth(month, yi.days)*24*60*60*1000;
			if( floatingTime > date.getTime() )
			{	result.year = possibilities[i];
				result.month = month;
				result.day = ( ( new Date(date.getFullYear(), date.getMonth(), date.getDate()) ).getTime() - temp )/1000/60/60/24 + 1;
				return result;
			}
		}
		for(var month=NISAN; month<=ELUL; month++)
		{	var temp = floatingTime;
			floatingTime += countDaysInMonth(month, yi.days)*24*60*60*1000;
			if( floatingTime > date.getTime() )
			{	result.year = possibilities[i];
				result.month = month;
				result.day = ( ( new Date(date.getFullYear(), date.getMonth(), date.getDate()) ).getTime() - temp )/1000/60/60/24 + 1;
				return result;
			}
		}
	}
}

/*|____________________________________________________________|*|
|                definition of type JCalendar                    |
|         (this type does not perform any calculations)          |
|                                                                |
| interface:                                                     |
|                                                                |
| - JCalendar() or JCalendar(gregorianDate)                      |
|               or JCalendar(jyear, jmonth, jday)                |
|                                                                |
| - setJYear(jyear)                                              |
| - setJMonth(jmonth)                                            |
| - setJDate(jday)                                               |
|                                                                |
| - getJYear()                                                   |
| - getJMonth()                                                  |
| - getJDate()                                                   |
|                                                                |
| - getJYearInfo()                                               |
| - getJMonthInfo()                                              |
|                                                                |
| - setGyear(gyear)                                              |
| - setGMonth(gmonth)                                            |
| - setGDate(gday)                                               |
| - setGregorian(gregorian) or setGregorian(gyear, gmonth, gday) |
|                                                                |
| - getGYear()                                                   |
| - getGMonth()                                                  |
| - getGDate()                                                   |
| - getGregorian()                                               |
|                                                                |
|*|____________________________________________________________|*/

function JCalendar(arg1, arg2, arg3)
{	/* fields */

	this._jyear = null;		// any integer
	this._jmonth = null;	// integer in range NISAN..ADAR_2
	this._jday = null;		// integer in range 1..30
	this._yi = null;		// object that getYearInfo() returns

	this._gregorian = null;	// object of type Date

	/* private methods */

	this._jChanged = function()
	{	// set _gregorian according to _jyear, _jmonth, _jday, _yi
		// but first verify data
		if( this._jmonth==ADAR_2 && this._yi.months==12 ) this._jmonth = ADAR;
		if( this._jday==30 && countDaysInMonth(this._jmonth, this._yi.days)==29 ) this._jday = 29;
		this._gregorian = new Date( getDateOf1stDay(this._yi.roshHaShana, this._jmonth, this._yi.days).getTime() + (this._jday-1)*24*60*60*1000 );
	};

	this._gChanged = function()
	{	// set _jyear, _jmonth, _jday, _yi according to _gregorian
		var j = gregToJewish(this._gregorian);
		this._jyear = j.year;
		this._jmonth = j.month;
		this._jday = j.day;
		this._yi = getYearInfo(j.year);
	};

	/* public methods */

	this.setJYear = function(jyear)
	{	if( this._jyear == jyear ) return;
		this._jyear = jyear;
		this._yi = getYearInfo(jyear);
		this._jChanged();
	};
	this.setJMonth = function(jmonth)
	{	if( jmonth<NISAN || jmonth>ADAR_2 ) return;
		if( jmonth==ADAR_2 && this._yi.months==12 ) jmonth = ADAR;
		if( this._jmonth == jmonth ) return;
		this._jmonth = jmonth;
		this._jChanged();
	};
	this.setJDate = function(jday)
	{	if( jday<1 || jday>countDaysInMonth(this._jmonth, this._yi.days) ) return;
		if( this._jday == jday ) return;
		this._jday = jday;
		this._jChanged();
	};

	this.getJYear = function()
	{	return this._jyear;
	};
	this.getJMonth = function()
	{	return this._jmonth;
	};
	this.getJDate = function()
	{	return this._jday;
	};

	this.getJYearInfo = function()
	{	return this._yi;
	};
	this.getJMonthInfo = function()
	{	var info = new Object();
		{	var month_offset; // Tishrey:0, Hheshvan:1 ... Adar:5, Adar Bet:6 (if present), Nisan:6|7, Iyar:7|8 ... Elul:11|12
			if( this._jmonth>=TISHREY ) // i.e. TISHREY..ADAR_2
			{	month_offset = this._jmonth - TISHREY;
			}	else // i.e. NISAN..ELUL
			{	month_offset = (this._jmonth-NISAN) + (this._yi.months==12? 6 : 7);
			}
			info.molad = new Date(this._yi.molad.getTime()+month_offset*_MOLAD_CONSTANT);
			info.firstDay = getDateOf1stDay(this._yi.roshHaShana, this._jmonth, this._yi.days);
			info.days = countDaysInMonth(this._jmonth, this._yi.days);
		}
		return info;
	};

	this.setGYear = function(gyear)
	{	if( this._gregorian.getFullYear() == gyear ) return;
		this._gregorian.setFullYear(gyear);
		this._gChanged();
	};
	this.setGMonth = function(gmonth)
	{	if( this._gregorian.getMonth() == gmonth ) return;
		this._gregorian.setMonth(gmonth);
		this._gChanged();
	};
	this.setGDate = function(gday)
	{	if( this._gregorian.getDate() == gday ) return;
		this._gregorian.setDate(gday);
		this._gChanged();
	};
	this.setGregorian = function(arg1, arg2, arg3)
	{	if( arg1!=null && arg2==null && arg3==null )
		{	// arg1 - object of type Date or integer indicating time since epoch
			if( arg1.getTime )
				this._gregorian = arg1;
			else
				this._gregorian = new Date(arg1);
			this._gChanged();
		}	else if( arg1!=null && arg2!=null && arg3!=null )
		{	// arg1 - gyear, arg2 - gmonth, arg3 - gday
			this._gregorian.setFullYear(arg1);
			this._gregorian.setMonth(arg2);
			this._gregorian.setDate(arg3);
			this._gChanged();
		}
	};

	this.getGYear = function()
	{	return this._gregorian.getFullYear();
	};
	this.getGMonth = function()
	{	return this._gregorian.getMonth();
	};
	this.getGDate = function()
	{	return this._gregorian.getDate();
	};
	this.getGregorian = function()
	{	return this._gregorian;
	};

	this.toString = function()
	{	return this._jday + ' ' + ["","Nisan","Iyar","Sivan","Tamuz","Av","Elul","Tishrey","Hheshvan","Kislev","Tevet","Shevat","Adar","Adar Bet"][this._jmonth] + ' ' + this._jyear;
	};

	/* init */

	if( arg1!=null && arg2==null && arg3==null )
	{	// arg1 - object of type gregorian Date
		this._gregorian = arg1;
		this._gChanged();
	}	else if( arg1!=null && arg2!=null && arg3!=null )
	{	// arg1 - jyear, arg2 - jmonth, arg3 - jday
		this._jyear = arg1;
		this._jmonth = arg2;
		this._jday = arg3;
		this._yi = getYearInfo(arg1);
		this._jChanged();
	}	else
	{	// initialize with current moment
		this._gregorian = new Date();
		this._gChanged();
	}
}
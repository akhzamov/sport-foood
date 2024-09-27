export const reportData = {
	days: {
		"01.09.2024": {
			workDay: false,
		},
		"02.09.2024": {
			workDay: true,
		},
		"03.09.2024": {
			workDay: true,
		},
		"04.09.2024": {
			workDay: true,
		},
		"05.09.2024": {
			workDay: true,
		},
		"06.09.2024": {
			workDay: true,
		},
		"07.09.2024": {
			workDay: false,
		},
		"08.09.2024": {
			workDay: false,
		},
		"09.09.2024": {
			workDay: true,
		},
		"10.09.2024": {
			workDay: true,
		},
		"11.09.2024": {
			workDay: true,
		},
		"12.09.2024": {
			workDay: true,
		},
		"13.09.2024": {
			workDay: true,
		},
		"14.09.2024": {
			workDay: false,
		},
		"15.09.2024": {
			workDay: false,
		},
		"16.09.2024": {
			workDay: true,
		},
		"17.09.2024": {
			workDay: true,
		},
		"18.09.2024": {
			workDay: true,
		},
		"19.09.2024": {
			workDay: true,
		},
		"20.09.2024": {
			workDay: true,
		},
		"21.09.2024": {
			workDay: false,
		},
		"22.09.2024": {
			workDay: false,
		},
		"23.09.2024": {
			workDay: true,
		},
		"24.09.2024": {
			workDay: true,
		},
		"25.09.2024": {
			workDay: true,
		},
		"26.09.2024": {
			workDay: true,
		},
		"27.09.2024": {
			workDay: true,
		},
		"28.09.2024": {
			workDay: false,
		},
		"29.09.2024": {
			workDay: false,
		},
		"30.09.2024": {
			workDay: true,
		},
	},
	// worked - Присутствует
	// absent - Отсутствует
	// sick_leave - Больничный
	// vocation - Отпуск
	employees: {
		1: {
			name: "Антон",
			lastName: "Никитинов",
			department: "Администратор",
			days: {
				"01.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"02.09.2024": {
					status: "absent",
					replaced_id: 2,
				},
				"03.09.2024": {
					status: "absent",
					replaced_id: 2,
				},
				"04.09.2024": {
					status: "sick_leave",
					replaced_id: 2,
				},
				"05.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"06.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"07.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"08.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"09.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"10.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"11.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"12.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"13.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"14.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"15.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"16.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"17.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"18.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"19.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"20.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"21.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"22.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"23.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"24.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"25.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"26.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"27.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"28.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"29.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"30.09.2024": {
					status: "worked",
					replaced_id: null,
				},
			},
			totalWorkDays: 18,
		},
		2: {
			name: "Олег",
			lastName: "Максимов",
			department: "Администратор",
			days: {
				"01.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"02.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"03.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"04.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"05.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"06.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"07.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"08.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"09.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"10.09.2024": {
					status: "absent",
					replaced_id: 1,
				},
				"11.09.2024": {
					status: "absent",
					replaced_id: 1,
				},
				"12.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"13.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"14.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"15.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"16.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"17.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"18.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"19.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"20.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"21.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"22.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"23.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"24.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"25.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"26.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"27.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"28.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"29.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"30.09.2024": {
					status: "worked",
					replaced_id: null,
				},
			},
			totalWorkDays: 19,
		},
		3: {
			name: "Александр",
			lastName: "Иванов",
			department: "Администратор",
			days: {
				"01.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"02.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"03.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"04.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"05.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"06.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"07.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"08.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"09.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"10.09.2024": {
					status: "vocation",
					replaced_id: 4,
				},
				"11.09.2024": {
					status: "vocation",
					replaced_id: 4,
				},
				"12.09.2024": {
					status: "vocation",
					replaced_id: 4,
				},
				"13.09.2024": {
					status: "vocation",
					replaced_id: 4,
				},
				"14.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"15.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"16.09.2024": {
					status: "vocation",
					replaced_id: 4,
				},
				"17.09.2024": {
					status: "vocation",
					replaced_id: 4,
				},
				"18.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"19.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"20.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"21.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"22.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"23.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"24.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"25.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"26.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"27.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"28.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"29.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"30.09.2024": {
					status: "worked",
					replaced_id: null,
				},
			},
			totalWorkDays: 15,
		},
		4: {
			name: "Анна",
			lastName: "Смирнова",
			department: "Администратор",
			days: {
				"01.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"02.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"03.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"04.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"05.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"06.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"07.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"08.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"09.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"10.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"11.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"12.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"13.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"14.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"15.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"16.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"17.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"18.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"19.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"20.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"21.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"22.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"23.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"24.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"25.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"26.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"27.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"28.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"29.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"30.09.2024": {
					status: "worked",
					replaced_id: null,
				},
			},
			totalWorkDays: 21,
		},
		5: {
			name: "Лилия",
			lastName: "Колякова",
			department: "Администратор",
			days: {
				"01.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"02.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"03.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"04.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"05.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"06.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"07.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"08.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"09.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"10.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"11.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"12.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"13.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"14.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"15.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"16.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"17.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"18.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"19.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"20.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"21.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"22.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"23.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"24.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"25.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"26.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"27.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"28.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"29.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"30.09.2024": {
					status: "worked",
					replaced_id: null,
				},
			},
			totalWorkDays: 21,
		},
		6: {
			name: "Алия",
			lastName: "Тимурова",
			department: "Администратор",
			days: {
				"01.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"02.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"03.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"04.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"05.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"06.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"07.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"08.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"09.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"10.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"11.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"12.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"13.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"14.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"15.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"16.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"17.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"18.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"19.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"20.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"21.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"22.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"23.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"24.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"25.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"26.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"27.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"28.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"29.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"30.09.2024": {
					status: "worked",
					replaced_id: null,
				},
			},
			totalWorkDays: 21,
		},
		7: {
			name: "Алина",
			lastName: "Васильевна",
			department: "Администратор",
			days: {
				"01.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"02.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"03.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"04.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"05.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"06.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"07.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"08.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"09.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"10.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"11.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"12.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"13.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"14.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"15.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"16.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"17.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"18.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"19.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"20.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"21.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"22.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"23.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"24.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"25.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"26.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"27.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"28.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"29.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"30.09.2024": {
					status: "worked",
					replaced_id: null,
				},
			},
			totalWorkDays: 21,
		},
		8: {
			name: "Полина",
			lastName: "Федорова",
			department: "Администратор",
			days: {
				"01.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"02.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"03.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"04.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"05.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"06.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"07.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"08.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"09.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"10.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"11.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"12.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"13.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"14.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"15.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"16.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"17.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"18.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"19.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"20.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"21.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"22.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"23.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"24.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"25.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"26.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"27.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"28.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"29.09.2024": {
					status: "sick_leave",
					replace_id: null,
				},
				"30.09.2024": {
					status: "worked",
					replaced_id: null,
				},
			},
			totalWorkDays: 21,
		},
	},
};

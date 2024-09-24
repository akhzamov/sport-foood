export const reportData = {
	days: {
		"01.09.2024": {
			workDay: true,
		},
		"02.09.2024": {
			workDay: true,
		},
	},
	employees: {
		1: {
			name: "Антон",
			lastName: "Никитинов",
			department: "Администратор",
			days: {
				"01.09.2024": {
					status: "worked",
					replaced_id: null,
				},
				"02.09.2024": {
					status: "worked",
					replaced_id: null,
				},
			},
			totalWorkDays: 2,
		},
		2: {
			name: "Олег",
			lastName: "Максимов",
			department: "Администратор",
			days: {
				"01.09.2024": {
					status: "absent",
					replaced_id: 1,
				},
				"02.09.2024": {
					status: "worked",
					replaced_id: null,
				},
			},
			totalWorkDays: 1,
		},
		3: {
			name: "Александр",
			lastName: "Иванов",
			department: "Администратор",
			days: {
				"01.09.2024": {
					status: "sick_leave",
					replaced_id: null,
				},
				"02.09.2024": {
					status: "worked",
					replaced_id: null,
				},
			},
			totalWorkDays: 1,
		},
		4: {
			name: "Анна",
			lastName: "Смирнова",
			department: "Администратор",
			days: {
				"01.09.2024": {
					status: "vacation",
					replaced_id: 3,
				},
				"02.09.2024": {
					status: "worked",
					replaced_id: null,
				},
			},
			totalWorkDays: 1,
		},
	},
};

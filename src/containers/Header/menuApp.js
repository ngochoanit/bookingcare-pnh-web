export const adminMenu = [
    { //Quản Lý Người Dùng
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage',
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux',
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' }
                // ]
            },
            // {
            //     name: 'menu.admin.manage-admin', link: '/system/user-admin',
            // },
            { //Quản Lý kế Hoạch Khám bệnh bác sĩ
                name: 'menu.doctor.manage-schedule',
                menus: [
                    {
                        name: 'menu.doctor.schedule', link: '/doctor/manage-schedule',
                    },

                ]
            }
        ]
    },
    { //Quản Lý Phòng Khám
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic',
            }
        ]
    },
    { //Quản Lý Phòng Khám
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty',
            }
        ]
    },
    { //Quản Lý Cẩm nang
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook',
            }
        ]
    }
];
export const doctorMenu = [
    { //Quản Lý kế Hoạch Khám bệnh bác sĩ
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule',
            }
        ]
    }
];
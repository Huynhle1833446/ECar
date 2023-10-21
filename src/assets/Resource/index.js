import ImageUltils from '../../assets/Images/ImageUltils';

export const imageCarousel = [
    { image: ImageUltils.getImageSource('slide1') },
    { image: ImageUltils.getImageSource('slide2') },
    { image: ImageUltils.getImageSource('slide3') },
    { image: ImageUltils.getImageSource('slide4') },
    { image: ImageUltils.getImageSource('slide5') }
]
export const news = [
    {
        id: 1,
        title: 'Du lịch dịp 2/9: Vì sao không bùng nổ, kỳ nghỉ vét kén khách?',
        subtitle: 'Kỳ nghỉ lễ 2/9 kéo dài 4 ngày là thời điểm thích hợp để có những chuyến du lịch ngắn ngày. Tuy nhiên, theo dự định du lịch dịp lễ 2/9 không bùng nổ. Bởi đây là "kỷ nghỉ vét" của nhiều gia đình trước khi vào năm học mới nên lượng khách không như cao điểm mùa du lịch hè.',
        illustration: ImageUltils.getImageSource('new1')
    },
    {
        id: 2,
        title: 'Du lịch Việt Nam đang trở thành xu hướng của giới trẻ và các sao xứ Kim chi',
        subtitle: 'Việt Nam đang trở thành điểm du lịch, nghỉ dưỡng rất "được lòng" giới trẻ xứ Kim chi. ',
        illustration: ImageUltils.getImageSource('new2')
    },
    {
        id: 3,
        title: 'Việt Nam bất ngờ dẫn đầu khu vực về du lịch có trách nhiệm',
        subtitle: 'Theo nghiên cứu về Chỉ số tự tin du lịch APAC 2023, du khách Việt Nam thích ngắm cảnh hơn hoặc ưu tiên các kỳ nghỉ gia đình nhiều hơn sau ảnh hưởng của đại dịch COVID-19.',
        illustration: ImageUltils.getImageSource('new3')
    },
    {
        id: 4,
        title: 'Khách Trung Quốc tăng mạnh, du lịch Việt thu gần 200.000 tỷ đồng chỉ 4 tháng',
        subtitle: 'Theo báo cáo của Tổng Cục Du lịch - Bộ Văn hoá, Thể thao và Du lịch, trong 4 tháng đầu năm 2023, ngành du lịch thu về gần 200.000 tỷ đồng.',
        illustration: ImageUltils.getImageSource('new4')
    },
    {
        id: 5,
        title: 'Tổng cục Du lịch nói gì về mục tiêu đón 8 triệu khách quốc tế?',
        subtitle: 'Trước những lo ngại về mục tiêu đón 8 triệu lượt khách quốc tế trong năm 2023 của ngành du lịch Việt Nam, lãnh đạo Tổng cục Du lịch (Bộ VHTTDL) lên tiếng.',
        illustration: ImageUltils.getImageSource('new5')
    },
    {
        id: 6,
        title: 'TPHCM sẵn sàng đón khách Trung Quốc: Kỳ vọng thị trường tỷ dân',
        subtitle: 'Đón nhận thông tin Trung Quốc sẽ thí điểm mở cửa du lịch theo đoàn đến Việt Nam từ hôm nay (15/3), hầu hết các doanh nghiệp du lịch lữ hành tại TPHCM đều phấn khởi cho biết đã sẵn sàng đón khách và đặt nhiều kỳ vọng vào thị trường tỷ dân.',
        illustration: ImageUltils.getImageSource('new6')
    }
];
export const location = [
    {
        id: 1,
        image: ImageUltils.getImageSource('dainam'),
        title: 'Đại Nam',
        location: 'Bình Dương',
    },
    {
        id: 2,
        image: ImageUltils.getImageSource('damsen'),
        title: 'Đầm sen Park',
        location: 'TP.HCM',
    },
    {
        id: 3,
        image: ImageUltils.getImageSource('suoitien'),
        title: 'Suối Tiên Park',
        location: 'TP.HCM',
    },
    {
        id: 4,
        image: ImageUltils.getImageSource('bocap'),
        title: 'Bò Cạp Vàng',
        location: 'Đồng Nai',
    },
]
export const platForm = [
    {
        id: 1,
        title: 'Phủ sóng ở các địa điểm du lịch nổi tiếng',
        detail: 'Thiếp lập nhiều trạm xe, thuận tiện phục vụ hành khách.',
        icon : 'bus',
        colorIcon : 'blue'
    },
    {
        id: 2,
        title: 'Đặt vé dễ dàng',
        detail: 'Đặt vé chỉ với 60s. Đa dạng các khung giờ.',
        icon : 'ticket',
        colorIcon : '#FF8C00'
    },
    {
        id: 3,
        title: 'Đảm bảo có vé',
        detail: 'Hoàn ngay 150% nếu không có vé, mang đến hành trình trọn vẹn.',
        icon : 'check-square-o',
        colorIcon : 'green'
    },
    {
        id: 4,
        title: 'Nhiều ưu đãi',
        detail: 'Hàng ngàn ưu đãi cực chất độc quyền tại Ecar.',
        icon : 'tag',
        colorIcon : 'red'
    },
]
export const feedback = [
    {
        id: 1,
        name: 'Anh Lê Huỳnh',
        position: 'IT Văn Phòng',
        comment : "ECar là ứng dụng đầu tiên tôi nghĩ tới khi đi đến những khu du lịch nổi tiếng. Không những ECar có nhiều ưu đãi hấp dẫn mà còn có nhiều loại xe phục vụ cho mọi nhu cầu của khách hàng. Ngoài ra tôi còn được chọn loại xe, tài xế yêu thích nên tôi rất hài lòng.",
        image: ImageUltils.getImageSource('avt1')
    },
    {
        id: 2,
        name: 'Anh Sang',
        position: 'IT Văn Phòng',
        comment : "Tôi thường chọn đặt vé tại Vexere mỗi khi du lịch cùng người thân, bạn bè. Bên cạnh việc đặt vé nhanh chóng, thuận tiện, Vexere còn có các đợt Flashsale định kỳ lên đến 50%. Săn vé thành công vào các dịp này giúp tôi tiết kiệm đáng kể chi phí đi lại cho mỗi chuyển đi.",
        image: ImageUltils.getImageSource('avt2')
    },
    {
        id: 3,
        name: 'Anh Dương',
        position: 'IT Văn Phòng',
        comment : "Nhờ hiển thị rõ nhà xe và vị trí chỗ trống trên xe, tôi rất dễ dàng tìm vé mình muốn và chỗ mình muốn ngồi. Còn hình thức thanh toán có cả thẻ, ví, tại nhà xe và tốc độ thanh toán thì siêu nhanh, tiết kiệm cho tôi rất nhiều thời gian.",
        image: ImageUltils.getImageSource('avt3')
    },
    {
        id: 4,
        name: 'Chị Tú Ngô',
        position: 'Giám đốc tiếp thị Fahasa',
        comment : 'ECar là một phần không thể thiếu khi tôi đến những địa điểm du lịch nổi tiếng. Nhờ vào ứng dụng đặt xe nhanh chóng, thuận tiện, tôi vừa tiết kiệm được rất nhiều thời gian di chuyển giữa các địa điểm mà còn vừa tiết kiệm được thời gian khi mọi thứ đều hoạt động trơn tru.',
        image : ImageUltils.getImageSource('avt4')
    },
]

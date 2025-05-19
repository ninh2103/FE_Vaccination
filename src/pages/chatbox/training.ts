export interface TrainingItem {
  question: string
  answer: string
}

export const trainingData: TrainingItem[] = [
  {
    question: 'Địa chỉ của trung tâm ',
    answer: 'Trung tâm tiêm chủng VAXBOT có địa chỉ tại 120 Hoàng Minh Thảo, Thành phố Đà Nẵng '
  },
  {
    question: 'Số điện thoại liên hệ ',
    answer: '0909 090 909'
  },
  {
    question: 'Thời gian làm việc',
    answer: '- Từ 08h00 đến 17h00 (thứ 2 đến thứ 6) '
  },
  {
    question: 'Vắc-xin nào cần thiết cho trẻ sơ sinh?',
    answer:
      'Trẻ sơ sinh cần tiêm **vắc-xin viêm gan B** trong 24 giờ đầu sau sinh và **vắc-xin BCG** (phòng lao) trong tháng đầu đời.'
  },
  {
    question: 'Vắc-xin viêm gan B có tác dụng gì?',
    answer:
      'Vắc-xin viêm gan B bảo vệ cơ thể khỏi virus viêm gan B, giúp ngăn ngừa **viêm gan mạn tính**, **xơ gan** và **ung thư gan**.'
  },
  {
    question: 'Vắc-xin BCG phòng bệnh gì?',
    answer: 'Vắc-xin BCG phòng bệnh **lao**, đặc biệt là các thể lao nặng như lao màng não ở trẻ em.'
  },
  {
    question: 'Vắc-xin 5 trong 1 là gì?',
    answer:
      'Vắc-xin 5 trong 1 (Pentaxim hoặc Infanrix) phòng **bạch hầu**, **ho gà**, **uốn ván**, **viêm gan B** và **viêm màng não mủ do Hib**.'
  },
  {
    question: 'Vắc-xin sởi có cần tiêm nhắc lại không?',
    answer: 'Có, vắc-xin sởi cần tiêm 2 mũi: mũi 1 lúc 9 tháng tuổi và mũi nhắc lại lúc 18 tháng tuổi.'
  },
  {
    question: 'Vắc-xin nào phòng được bệnh thủy đậu?',
    answer: 'Vắc-xin Varivax hoặc Varicella phòng bệnh **thủy đậu**.'
  },
  {
    question: 'Vắc-xin cúm có hiệu quả bao lâu?',
    answer: 'Vắc-xin cúm có hiệu quả trong khoảng **6-12 tháng**, cần tiêm nhắc lại hàng năm.'
  },
  {
    question: 'Vắc-xin HPV dành cho ai?',
    answer:
      'Vắc-xin HPV dành cho **nữ giới từ 9-26 tuổi** để phòng **ung thư cổ tử cung** và các bệnh liên quan đến virus HPV.'
  },
  {
    question: 'прихвика nào phòng bệnh uốn ván?',
    answer: 'Vắc-xin **DPT** hoặc **Td** phòng bệnh **uốn ván**, thường kết hợp trong lịch tiêm chủng.'
  },
  {
    question: 'Vắc-xin phế cầu có mấy loại?',
    answer: 'Có 2 loại chính: **Synflorix** (phòng 10 loại phế cầu) và **Prevenar 13** (phòng 13 loại phế cầu).'
  },
  {
    question: 'Lịch tiêm vắc-xin cho trẻ 2 tháng tuổi là gì?',
    answer:
      '- **Vắc-xin 5 trong 1** (bạch hầu, ho gà, uốn ván, viêm gan B, Hib).\n- **Vắc-xin phế cầu** (Synflorix hoặc Prevenar 13).'
  },
  {
    question: 'Khi nào trẻ cần tiêm vắc-xin sởi?',
    answer: 'Trẻ cần tiêm vắc-xin sởi mũi 1 lúc **9 tháng tuổi** và mũi 2 lúc **18 tháng tuổi**.'
  },
  {
    question: 'Trẻ 1 tuổi cần tiêm những mũi nào?',
    answer: '- **Sởi - Quai bị - Rubella (MMR)**.\n- **Thủy đậu** (mũi 1).\n- **Viêm não Nhật Bản** (mũi 1).'
  },
  {
    question: 'Người lớn có cần tiêm nhắc vắc-xin uốn ván không?',
    answer: 'Có, người lớn nên tiêm nhắc vắc-xin **Td** (uốn ván - bạch hầu) mỗi **10 năm** một lần.'
  },
  {
    question: 'Vắc-xin viêm gan B tiêm mấy mũi?',
    answer:
      'Vắc-xin viêm gan B tiêm **3 mũi**: 0, 1, 6 tháng (mũi 2 cách mũi 1 ít nhất 1 tháng, mũi 3 cách mũi 2 ít nhất 4 tháng).'
  },
  {
    question: 'Lịch tiêm vắc-xin HPV cho nữ là khi nào?',
    answer:
      'Nữ từ **9-26 tuổi**, tiêm 3 mũi: 0, 2, 6 tháng (mũi 2 cách mũi 1 ít nhất 2 tháng, mũi 3 cách mũi 2 ít nhất 4 tháng).'
  },
  {
    question: 'Trẻ 6 tháng tuổi có cần tiêm vắc-xin cúm không?',
    answer: 'Có, trẻ từ **6 tháng tuổi** trở lên nên tiêm vắc-xin cúm để phòng bệnh, đặc biệt vào mùa lạnh.'
  },
  {
    question: 'Mấy tháng thì tiêm vắc-xin DPT?',
    answer: 'Vắc-xin DPT tiêm lúc **2 tháng**, **3 tháng**, **4 tháng** và nhắc lại lúc **18 tháng tuổi**.'
  },
  {
    question: 'Có cần tiêm vắc-xin trước khi mang thai không?',
    answer: 'Có, phụ nữ nên tiêm **sởi - quai bị - rubella (MMR)** và **thủy đậu** ít nhất 1 tháng trước khi mang thai.'
  },
  {
    question: 'Giá vắc-xin viêm gan B là bao nhiêu?',
    answer: 'Giá vắc-xin viêm gan B tại VAXBOT khoảng **250.000 - 300.000 VND/liều** (tùy loại trẻ em hoặc người lớn).'
  },
  {
    question: 'Tiêm vắc-xin 5 trong 1 hết bao nhiêu tiền?',
    answer: 'Vắc-xin 5 trong 1 (Pentaxim) tại VAXBOT có giá khoảng **700.000 VND/liều**.'
  },
  {
    question: 'Vắc-xin sởi có đắt không?',
    answer: 'Không, vắc-xin sởi tại VAXBOT giá khoảng **200.000 VND/liều**, khá hợp lý.'
  },
  {
    question: 'Chi phí tiêm vắc-xin HPV là bao nhiêu?',
    answer: 'Vắc-xin HPV (Gardasil) tại VAXBOT giá khoảng **1.200.000 VND/liều**, cần 3 mũi.'
  },
  {
    question: 'Vắc-xin phế cầu giá bao nhiêu một mũi?',
    answer: 'Vắc-xin phế cầu Prevenar 13 giá khoảng **1.000.000 VND/liều** tại VAXBOT.'
  },
  {
    question: 'Tiêm vắc-xin cúm bao nhiêu tiền?',
    answer: 'Vắc-xin cúm (Vaxigrip Tetra) tại VAXBOT giá khoảng **350.000 VND/liều**.'
  },
  {
    question: 'Giá vắc-xin thủy đậu hiện tại là bao nhiêu?',
    answer: 'Vắc-xin thủy đậu (Varivax) tại VAXBOT giá khoảng **700.000 VND/liều**.'
  },
  {
    question: 'Vắc-xin uốn ván có miễn phí không?',
    answer:
      'Vắc-xin uốn ván có thể miễn phí trong chương trình tiêm chủng mở rộng, nếu không giá khoảng **150.000 VND/liều** tại VAXBOT.'
  },
  {
    question: 'Tiêm vắc-xin cho trẻ sơ sinh có tốn phí không?',
    answer:
      'Một số vắc-xin như viêm gan B và BCG miễn phí trong chương trình tiêm chủng mở rộng, nếu tiêm dịch vụ thì khoảng **200.000 - 300.000 VND/liều**.'
  },
  {
    question: 'Vắc-xin 6 trong 1 giá bao nhiêu?',
    answer: 'Vắc-xin 6 trong 1 (Hexaxim) tại VAXBOT giá khoảng **1.000.000 VND/liều**.'
  },
  {
    question: 'Vắc-xin có gây sốt không?',
    answer: 'Có, một số vắc-xin như DPT hoặc sởi có thể gây **sốt nhẹ** trong 1-2 ngày sau tiêm.'
  },
  {
    question: 'Tác dụng phụ của vắc-xin viêm gan B là gì?',
    answer: '- **Phản ứng tại chỗ**: Sưng, đỏ, đau nhẹ.\n- **Toàn thân**: Sốt nhẹ, mệt mỏi (hiếm gặp).'
  },
  {
    question: 'Trẻ tiêm vắc-xin xong bị sưng đỏ thì phải làm sao?',
    answer: 'Chườm lạnh tại chỗ tiêm, nếu sưng nhiều hoặc kèm sốt cao thì liên hệ bác sĩ ngay.'
  },
  {
    question: 'Vắc-xin có gây dị ứng không?',
    answer:
      'Hiếm gặp, nhưng có thể xảy ra ở người mẫn cảm với thành phần vắc-xin, cần báo bác sĩ nếu có tiền sử dị ứng.'
  },
  {
    question: 'Tiêm vắc-xin có an toàn cho trẻ không?',
    answer: 'Rất an toàn nếu tuân thủ chỉ định bác sĩ và tiêm tại cơ sở uy tín như VAXBOT.'
  },
  {
    question: 'Trẻ đang ốm có tiêm vắc-xin được không?',
    answer: 'Không nên, cần hoãn tiêm nếu trẻ đang sốt hoặc mắc bệnh cấp tính.'
  },
  {
    question: 'Vắc-xin có gây vô sinh không?',
    answer: 'Không, đây là tin đồn sai sự thật. Vắc-xin đã được nghiên cứu và chứng minh an toàn.'
  },
  {
    question: 'Tiêm nhiều vắc-xin cùng lúc có sao không?',
    answer:
      'Không sao, trẻ có thể tiêm nhiều vắc-xin cùng lúc nếu bác sĩ chỉ định, hệ miễn dịch vẫn hoạt động bình thường.'
  },
  {
    question: 'Vắc-xin cúm có gây cảm cúm không?',
    answer: 'Không, vắc-xin cúm chứa virus bất hoạt, không gây bệnh cúm.'
  },
  {
    question: 'Phản ứng sau tiêm vắc-xin kéo dài bao lâu?',
    answer: 'Thường kéo dài **1-2 ngày**, nếu lâu hơn cần liên hệ bác sĩ.'
  },
  {
    question: 'Trung tâm có làm việc cuối tuần không?',
    answer: 'Hiện tại trung tâm chỉ làm việc từ thứ 2 đến thứ 6, không mở cửa cuối tuần.'
  },
  {
    question: 'Có cần đặt lịch trước khi đến trung tâm không?',
    answer: 'Có, bạn nên đặt lịch qua số **0909 090 909** để được phục vụ tốt nhất.'
  },
  {
    question: 'Trung tâm VAXBOT có chi nhánh nào khác không?',
    answer: 'Hiện tại chỉ có một chi nhánh tại **120 Hoàng Minh Thảo, Đà Nẵng**.'
  },
  {
    question: 'Trung tâm có dịch vụ tiêm tại nhà không?',
    answer: 'Hiện tại trung tâm chưa cung cấp dịch vụ tiêm tại nhà.'
  },
  {
    question: 'Làm sao để liên hệ đặt mua vắc-xin?',
    answer: 'Gọi số **0909 090 909** hoặc đến trực tiếp **120 Hoàng Minh Thảo, Đà Nẵng**.'
  },
  {
    question: 'Trung tâm có bán vắc-xin cho người lớn không?',
    answer: 'Có, trung tâm cung cấp vắc-xin cho cả trẻ em và người lớn.'
  },
  {
    question: 'Trung tâm có chấp nhận thanh toán thẻ không?',
    answer: 'Không,Hiện tại trung tâm chấp nhận thanh toán bằng tiền mặt và Chuyển khoản qua ví điện tử MOMO.'
  },
  {
    question: 'Vắc-xin nào cần tiêm khi đi du lịch nước ngoài?',
    answer: 'Tùy quốc gia, thường cần: **viêm gan A**, **viêm gan B**, **thương hàn**, và **sốt vàng**.'
  },
  {
    question: 'Trẻ bị dị ứng trứng có tiêm vắc-xin MMR được không?',
    answer: 'Được, vắc-xin MMR không chứa protein trứng gây dị ứng đáng kể.'
  },
  {
    question: 'Vắc-xin có bảo vệ 100% không?',
    answer: 'Không, hiệu quả thường từ **85-95%**, tùy loại vắc-xin và cơ địa.'
  },
  {
    question: 'Tiêm vắc-xin có cần xét nghiệm trước không?',
    answer: 'Không cần, trừ trường hợp đặc biệt theo chỉ định bác sĩ.'
  },
  {
    question: 'Vắc-xin có hạn sử dụng không?',
    answer: 'Có, mỗi lô vắc-xin có hạn sử dụng riêng, thường từ **2-3 năm**.'
  },
  {
    question: 'Trẻ sinh non có tiêm vắc-xin được không?',
    answer: 'Được, nhưng cần theo dõi y tế chặt chẽ và tuân theo chỉ định bác sĩ.'
  },
  {
    question: 'Vắc-xin có thể tiêm trễ hơn lịch không?',
    answer: 'Được, nhưng nên tiêm sớm nhất có thể để đảm bảo hiệu quả.'
  },
  {
    question: 'Người già có cần tiêm vắc-xin không?',
    answer: 'Có, người già nên tiêm **cúm**, **phế cầu**, và **zona thần kinh**.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh zona?',
    answer: 'Vắc-xin **Zostavax** hoặc **Shingrix** phòng bệnh **zona thần kinh**.'
  },
  {
    question: 'Tiêm vắc-xin có cần kiêng ăn gì không?',
    answer: 'Không cần kiêng đặc biệt, nhưng tránh rượu bia và đồ kích thích sau tiêm.'
  },
  {
    question: 'Vắc-xin viêm não Nhật Bản tiêm mấy mũi?',
    answer: 'Tiêm 3 mũi: **1-2 tuổi (mũi 1, 2 cách 1-2 tuần)**, nhắc lại sau 1 năm.'
  },
  {
    question: 'Trẻ 3 tuổi cần tiêm vắc-xin gì?',
    answer: '- **Viêm não Nhật Bản** (mũi 3).\n- **DPT** (mũi nhắc lại).'
  },
  {
    question: 'Vắc-xin nào phòng bệnh tiêu chảy?',
    answer: 'Vắc-xin **Rotateq** hoặc **Rotarix** phòng tiêu chảy do **Rotavirus**.'
  },
  {
    question: 'Giá vắc-xin Rotateq là bao nhiêu?',
    answer: 'Vắc-xin Rotateq giá khoảng **600.000 VND/liều** tại VAXBOT.'
  },
  {
    question: 'Vắc-xin thương hàn có cần thiết không?',
    answer: 'Cần nếu đi du lịch hoặc sống ở khu vực có nguy cơ cao.'
  },
  {
    question: 'Trẻ 5 tuổi có cần tiêm nhắc vắc-xin không?',
    answer: 'Có, nên tiêm nhắc **DPT** và **thủy đậu** (mũi 2).'
  },
  {
    question: 'Vắc-xin nào phòng bệnh viêm màng não?',
    answer: 'Vắc-xin **Menactra** hoặc **Meningococcal** phòng viêm màng não do não mô cầu.'
  },
  {
    question: 'Giá vắc-xin Menactra là bao nhiêu?',
    answer: 'Vắc-xin Menactra giá khoảng **1.200.000 VND/liều** tại VAXBOT.'
  },
  {
    question: 'Vắc-xin có thể tiêm ở tay không?',
    answer: 'Được, tùy loại vắc-xin, có thể tiêm ở tay, đùi hoặc mông.'
  },
  {
    question: 'Trẻ bị cảm có tiêm vắc-xin được không?',
    answer: 'Không nên, cần đợi trẻ khỏe hẳn để tránh phản ứng phụ.'
  },
  {
    question: 'Vắc-xin có thể bảo quản ở nhà không?',
    answer: 'Không, vắc-xin cần bảo quản ở **2-8°C**, chỉ nên lưu trữ tại cơ sở y tế.'
  },
  {
    question: 'Tiêm vắc-xin có đau không?',
    answer: 'Có thể đau nhẹ tại chỗ tiêm, nhưng thường chỉ kéo dài vài phút.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh tay chân miệng?',
    answer: 'Hiện chưa có vắc-xin đặc hiệu phòng tay chân miệng.'
  },
  {
    question: 'Trẻ bị suy dinh dưỡng có tiêm vắc-xin được không?',
    answer: 'Được, nhưng cần khám sàng lọc kỹ trước khi tiêm.'
  },
  {
    question: 'Vắc-xin có ảnh hưởng đến sức khỏe lâu dài không?',
    answer: 'Không, vắc-xin được chứng minh an toàn qua nhiều nghiên cứu.'
  },
  {
    question: 'Người bị tiểu đường có tiêm vắc-xin được không?',
    answer: 'Được, người tiểu đường vẫn tiêm vắc-xin bình thường theo chỉ định.'
  },
  {
    question: 'Vắc-xin nào cần tiêm khi mang thai?',
    answer: 'Phụ nữ mang thai nên tiêm **uốn ván** (Td) và **cúm**.'
  },
  {
    question: 'Trẻ 9 tháng tuổi tiêm vắc-xin gì?',
    answer: '- **Sởi** (mũi 1).\n- **Viêm não Nhật Bản** (nếu cần).'
  },
  {
    question: 'Người bị HIV có tiêm vắc-xin được không?',
    answer: 'Được, nhưng cần bác sĩ tư vấn dựa trên tình trạng miễn dịch.'
  },
  {
    question: 'Vắc-xin có phòng được biến thể virus không?',
    answer: 'Tùy loại, như vắc-xin cúm cần cập nhật hàng năm để phòng biến thể.'
  },
  {
    question: 'Trẻ bị dị ứng sữa có tiêm vắc-xin được không?',
    answer: 'Được, dị ứng sữa không ảnh hưởng đến việc tiêm vắc-xin.'
  },
  {
    question: 'Vắc-xin nào cần tiêm khi đi châu Phi?',
    answer: 'Cần tiêm **sốt vàng**, **thương hàn**, và **viêm màng não**.'
  },
  {
    question: 'Tiêm vắc-xin có cần nghỉ ngơi không?',
    answer: 'Nên nghỉ ngơi nhẹ nhàng sau tiêm, tránh vận động mạnh.'
  },
  {
    question: 'Vắc-xin có gây buồn ngủ không?',
    answer: 'Có thể gây mệt mỏi nhẹ, nhưng không phải buồn ngủ trực tiếp.'
  },
  {
    question: 'Trẻ bị sốt nhẹ có tiêm vắc-xin được không?',
    answer: 'Không nên, cần đợi trẻ hết sốt hoàn toàn.'
  },
  {
    question: 'Vắc-xin nào cần tiêm khi đi Mỹ?',
    answer: 'Tùy yêu cầu nhập cảnh, thường cần **cúm**, **sởi**, và **bạch hầu**.'
  },
  {
    question: 'Giá vắc-xin viêm não Nhật Bản là bao nhiêu?',
    answer: 'Vắc-xin viêm não Nhật Bản giá khoảng **300.000 VND/liều** tại VAXBOT.'
  },
  {
    question: 'Vắc-xin có thể tiêm khi đang cho con bú không?',
    answer: 'Được, hầu hết vắc-xin an toàn cho mẹ đang cho con bú.'
  },
  {
    question: 'Trẻ 2 tuổi cần tiêm vắc-xin gì?',
    answer: '- **Thủy đậu** (mũi 1).\n- **Viêm não Nhật Bản** (mũi 2).'
  },
  {
    question: 'Vắc-xin nào phòng bệnh sốt xuất huyết?',
    answer:
      'Hiện tại chưa có vắc-xin phòng sốt xuất huyết được sử dụng rộng rãi tại Việt Nam, nhưng vắc-xin Dengvaxia có thể được cân nhắc ở một số khu vực nguy cơ cao.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh dại?',
    answer:
      'Vắc-xin Verorab hoặc Abhayrab phòng **bệnh dại**, thường tiêm sau khi bị động vật cắn hoặc tiêm dự phòng trước phơi nhiễm.'
  },
  {
    question: 'Vắc-xin nào dành cho người cao tuổi?',
    answer: '- **Boostrix**: Phòng bạch hầu, ho gà, uốn ván.\n- **Pneumovax 23**: Phòng phế cầu cho người trên 65 tuổi.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh viêm gan A?',
    answer: 'Vắc-xin Avaxim hoặc Havrix phòng **viêm gan A**, thường tiêm 2 mũi cách nhau 6-12 tháng.'
  },
  {
    question: 'Vắc-xin thương hàn có tác dụng bao lâu?',
    answer:
      'Vắc-xin Typhim Vi phòng **thương hàn** có hiệu quả khoảng **3 năm**, cần tiêm nhắc lại nếu nguy cơ còn cao.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh sốt vàng?',
    answer: 'Vắc-xin Stamaril phòng **sốt vàng**, cần thiết khi đi du lịch đến châu Phi hoặc Nam Mỹ.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh bại liệt?',
    answer: 'Vắc-xin IPV (trong Hexaxim hoặc Imovax Polio) phòng **bệnh bại liệt**, thường tiêm cho trẻ dưới 5 tuổi.'
  },
  {
    question: 'Vắc-xin nào dành cho người làm việc y tế?',
    answer: '- **Viêm gan B**.\n- **Cúm**.\n- **MMR** (sởi, quai bị, rubella) để bảo vệ trong môi trường nguy cơ cao.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh viêm họng do liên cầu khuẩn?',
    answer: 'Hiện chưa có vắc-xin đặc hiệu phòng viêm họng do liên cầu khuẩn tại VAXBOT.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh lao cho người lớn?',
    answer: 'Vắc-xin BCG chủ yếu dùng cho trẻ em, hiện chưa có vắc-xin lao đặc hiệu cho người lớn tại VAXBOT.'
  },
  {
    question: 'Thời gian chờ tiêm tại VAXBOT là bao lâu?',
    answer: 'Nếu đặt lịch trước, thời gian chờ thường dưới **15 phút**, tùy lượng khách tại trung tâm.'
  },
  {
    question: 'VAXBOT có hỗ trợ tư vấn qua điện thoại không?',
    answer: 'Có, gọi **Hotline 028 7102 6595** để được tư vấn miễn phí về vắc-xin và lịch tiêm.'
  },
  {
    question: 'VAXBOT có cung cấp giấy chứng nhận tiêm chủng không?',
    answer: 'Có, VAXBOT cấp **giấy chứng nhận tiêm chủng** theo yêu cầu, dùng cho du học hoặc xuất cảnh.'
  },
  {
    question: 'VAXBOT có giữ vắc-xin nếu tôi chưa tiêm ngay không?',
    answer: 'Có, nếu đặt mua gói vắc-xin, VAXBOT sẽ giữ vắc-xin cho bạn đến khi sẵn sàng tiêm.'
  },
  {
    question: 'VAXBOT có phòng chờ cho trẻ em không?',
    answer: 'Có, tất cả trung tâm VAXBOT đều có **khu vui chơi trẻ em** và phòng chờ thoải mái.'
  },
  {
    question: 'Có thể mua gói vắc-xin cho cả gia đình tại VAXBOT không?',
    answer: 'Có, VAXBOT cung cấp **gói vắc-xin gia đình** tùy chỉnh cho trẻ em và người lớn.'
  },
  {
    question: 'VAXBOT có hỗ trợ tiêm chủng cho doanh nghiệp không?',
    answer: 'Có, VAXBOT cung cấp dịch vụ tiêm chủng tại chỗ cho doanh nghiệp với số lượng lớn.'
  },
  {
    question: 'VAXBOT có bảo hiểm cho phản ứng sau tiêm không?',
    answer: 'VAXBOT không cung cấp bảo hiểm riêng, nhưng có đội ngũ y tế xử lý kịp thời mọi phản ứng sau tiêm.'
  },
  {
    question: 'Giá vắc-xin dại tại VAXBOT là bao nhiêu?',
    answer: 'Vắc-xin Verorab phòng dại giá khoảng **350.000 VND/liều** tại VAXBOT.'
  },
  {
    question: 'Vắc-xin viêm gan A giá bao nhiêu?',
    answer: 'Vắc-xin Avaxim giá khoảng **600.000 VND/liều** tại VAXBOT.'
  },
  {
    question: 'Giá vắc-xin sốt vàng là bao nhiêu?',
    answer: 'Vắc-xin Stamaril giá khoảng **800.000 VND/liều** tại VAXBOT.'
  },
  {
    question: 'Vắc-xin Boostrix giá bao nhiêu?',
    answer: 'Vắc-xin Boostrix (bạch hầu, ho gà, uốn ván) giá khoảng **700.000 VND/liều** tại VAXBOT.'
  },
  {
    question: 'Giá vắc-xin Pneumovax 23 là bao nhiêu?',
    answer: 'Vắc-xin Pneumovax 23 (phế cầu cho người lớn) giá khoảng **900.000 VND/liều** tại VAXBOT.'
  },
  {
    question: 'Vắc-xin thương hàn Typhim Vi giá bao nhiêu?',
    answer: 'Vắc-xin Typhim Vi giá khoảng **400.000 VND/liều** tại VAXBOT.'
  },
  {
    question: 'Gói vắc-xin cho trẻ 0-1 tuổi giá bao nhiêu?',
    answer: 'Gói vắc-xin 0-1 tuổi tại VAXBOT giá khoảng **10-12 triệu VND**, tùy loại vắc-xin chọn.'
  },
  {
    question: 'VAXBOT có giảm giá cho khách hàng thân thiết không?',
    answer: 'Có, khách hàng thân thiết được giảm giá khi mua gói hoặc tham gia chương trình ưu đãi của VAXBOT.'
  },
  {
    question: 'Chi phí khám sàng lọc tại VAXBOT là bao nhiêu?',
    answer: 'Khám sàng lọc trước tiêm tại VAXBOT **miễn phí 100%** cho mọi khách hàng.'
  },
  {
    question: 'VAXBOT có chấp nhận thanh toán qua ZaloPay không?',
    answer: 'Không, VAXBOT chỉ chấp nhận thanh toán qua  **Momo**'
  },
  {
    question: 'Trẻ bị dị ứng hải sản có tiêm vắc-xin được không?',
    answer:
      'Được, dị ứng hải sản không ảnh hưởng đến việc tiêm vắc-xin, trừ khi có dị ứng đặc biệt với thành phần vắc-xin.'
  },
  {
    question: 'Người bị hen suyễn có tiêm vắc-xin được không?',
    answer: 'Được, nhưng cần khám sàng lọc kỹ và báo tình trạng hen suyễn cho bác sĩ trước khi tiêm.'
  },
  {
    question: 'Phụ nữ đang kinh nguyệt có tiêm vắc-xin được không?',
    answer: 'Được, kinh nguyệt không ảnh hưởng đến việc tiêm vắc-xin.'
  },
  {
    question: 'Người vừa khỏi COVID-19 bao lâu thì tiêm vắc-xin được?',
    answer: 'Nên đợi ít nhất **1 tháng** sau khi khỏi COVID-19 để tiêm vắc-xin khác, theo tư vấn bác sĩ.'
  },
  {
    question: 'Trẻ bị tiêu chảy có tiêm vắc-xin được không?',
    answer: 'Không nên, cần hoãn tiêm đến khi trẻ hồi phục hoàn toàn.'
  },
  {
    question: 'Người bị cao huyết áp có tiêm vắc-xin được không?',
    answer: 'Được, nhưng cần đo huyết áp trước tiêm và báo bác sĩ nếu huyết áp không ổn định.'
  },
  {
    question: 'Trẻ bị tự kỷ có tiêm vắc-xin được không?',
    answer: 'Được, tự kỷ không phải là chống chỉ định với vắc-xin, nhưng cần theo dõi kỹ sau tiêm.'
  },
  {
    question: 'Người vừa phẫu thuật có tiêm vắc-xin được không?',
    answer: 'Không nên, cần đợi ít nhất **4-6 tuần** sau phẫu thuật, tùy tình trạng sức khỏe.'
  },
  {
    question: 'Trẻ bị viêm da có tiêm vắc-xin được không?',
    answer: 'Được nếu viêm da nhẹ, nhưng cần hoãn nếu viêm nặng hoặc có nhiễm trùng.'
  },
  {
    question: 'Người bị ung thư có tiêm vắc-xin được không?',
    answer: 'Được, nhưng cần bác sĩ chuyên khoa đánh giá trước, tránh tiêm khi đang hóa trị hoặc xạ trị.'
  },
  {
    question: 'Trẻ 4 tháng tuổi cần tiêm vắc-xin gì?',
    answer: '- **Vắc-xin 6 trong 1** (mũi 2).\n- **Phế cầu** (mũi 2).\n- **Rotavirus** (mũi 2).'
  },
  {
    question: 'Trẻ 12 tháng tuổi cần tiêm gì ngoài thủy đậu?',
    answer: '- **Viêm não Nhật Bản** (mũi 1).\n- **Phế cầu** (mũi nhắc lại).'
  },
  {
    question: 'Người lớn trên 60 tuổi cần tiêm nhắc vắc-xin gì?',
    answer: '- **Cúm** (hàng năm).\n- **Td** (10 năm/lần).\n- **Zona** (Shingrix, nếu cần).'
  },
  {
    question: 'Vắc-xin dại tiêm mấy mũi nếu bị chó cắn?',
    answer: 'Tiêm 5 mũi: **ngày 0, 3, 7, 14, 28** nếu chưa tiêm dự phòng trước đó.'
  },
  {
    question: 'Vắc-xin viêm gan A+B (Twinrix) tiêm khi nào?',
    answer: 'Tiêm 3 mũi: **0, 1, 6 tháng**, dành cho người cần phòng cả viêm gan A và B.'
  },
  {
    question: 'VAXBOT bảo quản vắc-xin như thế nào?',
    answer: 'VAXBOT sử dụng hệ thống kho lạnh GSP, giữ vắc-xin ở **2-8°C**, đảm bảo chất lượng từ nhập khẩu đến tiêm.'
  },
  {
    question: 'Vắc-xin để ngoài bao lâu thì hỏng?',
    answer: 'Vắc-xin để ngoài nhiệt độ **2-8°C** quá **30 phút** có thể giảm hiệu quả, cần bảo quản lạnh liên tục.'
  },
  {
    question: 'Trẻ bỏ lỡ mũi Rotavirus thì làm sao?',
    answer: 'Nếu trẻ trên 8 tháng tuổi, không nên tiêm Rotavirus nữa vì vượt độ tuổi khuyến cáo.'
  },
  {
    question: 'Người lớn chưa tiêm viêm gan B thì tiêm lúc nào?',
    answer: 'Có thể tiêm bất cứ lúc nào, lịch 3 mũi: **0, 1, 6 tháng**.'
  },
  {
    question: 'Vắc-xin Zona tiêm mấy mũi?',
    answer: 'Vắc-xin Shingrix tiêm 2 mũi, cách nhau **2-6 tháng**, dành cho người trên 50 tuổi.'
  },
  {
    question: 'VAXBOT có bán vắc-xin riêng lẻ không?',
    answer: 'Có, bạn có thể mua lẻ từng mũi hoặc theo gói tùy nhu cầu.'
  },
  {
    question: 'Tiêm vắc-xin có cần uống thuốc trước không?',
    answer: 'Không cần, trừ khi bác sĩ chỉ định để giảm phản ứng ở trường hợp đặc biệt.'
  },
  {
    question: 'VAXBOT có tổ chức hội thảo về vắc-xin không?',
    answer: 'Có, VAXBOT thường tổ chức hội thảo miễn phí về tiêm chủng, thông tin được cập nhật trên website.'
  },
  {
    question: 'Vắc-xin tại VAXBOT có bảo hành không?',
    answer: 'VAXBOT cam kết chất lượng vắc-xin, không có bảo hành riêng nhưng hỗ trợ nếu có vấn đề.'
  },
  {
    question: 'Tiêm vắc-xin có cần xét nghiệm kháng thể trước không?',
    answer: 'Không cần với hầu hết vắc-xin, trừ trường hợp đặc biệt như viêm gan B theo chỉ định bác sĩ.'
  },
  {
    question: 'VAXBOT có tiêm vắc-xin cho trẻ dưới 1 tháng không?',
    answer: 'Có, như vắc-xin **viêm gan B** trong 24 giờ sau sinh hoặc **BCG** trong tháng đầu.'
  },
  {
    question: 'Người bị viêm loét dạ dày có tiêm vắc-xin được không?',
    answer: 'Được, viêm loét dạ dày không phải chống chỉ định với vắc-xin.'
  },
  {
    question: 'Trẻ bị hăm tã có tiêm vắc-xin được không?',
    answer: 'Được nếu hăm nhẹ, nhưng cần báo bác sĩ để kiểm tra trước tiêm.'
  },
  {
    question: 'VAXBOT có hỗ trợ tiêm vắc-xin khẩn cấp không?',
    answer: 'Có, như vắc-xin dại hoặc uốn ván khi bị phơi nhiễm, cần đến ngay trung tâm.'
  },
  {
    question: 'Tiêm vắc-xin có ảnh hưởng đến xét nghiệm máu không?',
    answer: 'Không đáng kể, nhưng nên đợi **1-2 ngày** sau tiêm để xét nghiệm cho chính xác.'
  },
  {
    question: 'Tiêm vắc-xin có giúp giảm lây lan bệnh không?',
    answer: 'Có, tiêm vắc-xin tạo miễn dịch cộng đồng, giảm nguy cơ lây lan các bệnh như sởi, cúm.'
  },
  {
    question: 'VAXBOT có tham gia chương trình tiêm chủng miễn phí không?',
    answer:
      'VAXBOT là đơn vị dịch vụ, không tham gia chương trình miễn phí của nhà nước, nhưng có hỗ trợ giá cho một số đối tượng.'
  },
  {
    question: 'Tiêm vắc-xin có phòng được bệnh tái phát không?',
    answer: 'Tùy bệnh, như vắc-xin zona giúp giảm nguy cơ tái phát, nhưng không đảm bảo 100%.'
  },
  {
    question: 'VAXBOT có cung cấp thông tin dịch tễ không?',
    answer: 'Có, VAXBOT cập nhật thông tin dịch bệnh và khuyến cáo tiêm chủng trên website vaxbot.vn.'
  },
  {
    question: 'Vắc-xin có giúp giảm tử vong do bệnh truyền nhiễm không?',
    answer: 'Có, vắc-xin đã giảm hàng triệu ca tử vong do các bệnh như sởi, bạch hầu trên toàn cầu.'
  },
  {
    question: 'VAXBOT có tổ chức tiêm vắc-xin lưu động không?',
    answer: 'Hiện tại VAXBOT chưa triển khai tiêm lưu động, chỉ tổ chức tại trung tâm hoặc doanh nghiệp lớn.'
  },
  {
    question: 'Tiêm vắc-xin có ảnh hưởng đến hệ miễn dịch tự nhiên không?',
    answer: 'Không, vắc-xin tăng cường miễn dịch mà không làm suy yếu hệ miễn dịch tự nhiên.'
  },
  {
    question: 'VAXBOT có hỗ trợ tiêm cho người nước ngoài không?',
    answer: 'Có, VAXBOT phục vụ cả khách hàng nước ngoài với quy trình như khách Việt Nam.'
  },
  {
    question: 'Vắc-xin có phòng được các bệnh mới nổi không?',
    answer: 'Chỉ phòng được bệnh đã có vắc-xin, với bệnh mới cần nghiên cứu phát triển vắc-xin riêng.'
  },
  {
    question: 'VAXBOT có tham gia nghiên cứu vắc-xin không?',
    answer: 'VAXBOT không nghiên cứu, chỉ phân phối và cung ứng vắc-xin từ các nhà sản xuất quốc tế.'
  },
  {
    question: 'Trẻ bị ho có nên hoãn tiêm vắc-xin không?',
    answer: 'Nếu ho nhẹ thì được tiêm, nhưng ho nặng kèm sốt thì nên hoãn.'
  },
  {
    question: 'Người bị mất ngủ có tiêm vắc-xin được không?',
    answer: 'Được, mất ngủ không ảnh hưởng đến việc tiêm vắc-xin.'
  },
  {
    question: 'VAXBOT có bán vắc-xin cho bệnh viện khác không?',
    answer: 'Không, VAXBOT chỉ cung cấp và tiêm trực tiếp cho khách hàng tại hệ thống của mình.'
  },
  {
    question: 'Tiêm vắc-xin có cần kiêng tắm không?',
    answer: 'Không cần, nhưng tránh chà xát mạnh chỗ tiêm trong 24 giờ đầu.'
  },
  {
    question: 'VAXBOT có hỗ trợ tiêm vắc-xin theo yêu cầu không?',
    answer: 'Có, bạn có thể yêu cầu vắc-xin cụ thể nếu VAXBOT có sẵn trong danh mục.'
  },
  {
    question: 'Trẻ bị nổi mẩn đỏ có tiêm vắc-xin được không?',
    answer: 'Tùy mức độ, nếu mẩn đỏ do dị ứng nặng thì cần hoãn và khám bác sĩ.'
  },
  {
    question: 'Người bị thiếu máu có tiêm vắc-xin được không?',
    answer: 'Được, nhưng cần báo bác sĩ nếu thiếu máu nặng để đánh giá trước tiêm.'
  },
  {
    question: 'VAXBOT có kiểm tra chất lượng vắc-xin không?',
    answer: 'Có, vắc-xin tại VAXBOT được kiểm định bởi Bộ Y tế và bảo quản theo tiêu chuẩn GSP.'
  },
  {
    question: 'Tiêm vắc-xin có cần kiêng vận động không?',
    answer: 'Nên tránh vận động mạnh trong **24 giờ** sau tiêm để giảm kích ứng.'
  },
  {
    question: 'VAXBOT có hỗ trợ tư vấn qua email không?',
    answer: 'Có, bạn có thể gửi email đến **contact@vaxbot.com.vn** để được hỗ trợ.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh viêm gan C?',
    answer:
      'Hiện tại chưa có vắc-xin phòng viêm gan C tại VAXBOT. Tuy nhiên, bạn có thể tiêm vắc-xin **viêm gan A** và **viêm gan B** để bảo vệ gan.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh sốt rét?',
    answer:
      'Hiện tại VAXBOT chưa cung cấp vắc-xin phòng sốt rét. Tuy nhiên, vắc-xin **Mosquirix** đang được nghiên cứu và sử dụng ở một số khu vực.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh viêm nướu do vi khuẩn?',
    answer:
      'Hiện chưa có vắc-xin đặc hiệu phòng viêm nướu do vi khuẩn tại VAXBOT. Bạn nên duy trì vệ sinh răng miệng và khám nha khoa định kỳ.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh viêm tuyến giáp do virus?',
    answer:
      'Hiện chưa có vắc-xin đặc hiệu phòng viêm tuyến giáp do virus tại VAXBOT. Tuy nhiên, vắc-xin **MMR** có thể giảm nguy cơ từ virus quai bị.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh viêm bàng quang do vi khuẩn?',
    answer:
      'Hiện chưa có vắc-xin đặc hiệu phòng viêm bàng quang do vi khuẩn tại VAXBOT. Bạn nên duy trì vệ sinh và uống đủ nước để giảm nguy cơ.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh viêm tuyến vú ở phụ nữ sau sinh?',
    answer:
      'Hiện chưa có vắc-xin đặc hiệu phòng viêm tuyến vú tại VAXBOT. Tuy nhiên, vắc-xin **Td** có thể giúp giảm nguy cơ nhiễm trùng từ vết thương.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh viêm nội tâm mạc?',
    answer:
      'Hiện chưa có vắc-xin đặc hiệu phòng viêm nội tâm mạc tại VAXBOT. Tuy nhiên, vắc-xin **Prevenar 13** có thể giảm nguy cơ từ vi khuẩn phế cầu.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh viêm xoang do vi khuẩn?',
    answer:
      'Hiện chưa có vắc-xin đặc hiệu phòng viêm xoang do vi khuẩn tại VAXBOT. Tuy nhiên, vắc-xin **cúm** có thể giảm nguy cơ biến chứng từ virus.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh viêm tuyến nước bọt do virus khác ngoài quai bị?',
    answer:
      'Hiện chưa có vắc-xin đặc hiệu tại VAXBOT cho các virus khác ngoài quai bị gây viêm tuyến nước bọt. Vắc-xin **MMR** vẫn là lựa chọn chính.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh viêm phổi do Mycoplasma?',
    answer:
      'Hiện chưa có vắc-xin đặc hiệu phòng viêm phổi do Mycoplasma tại VAXBOT. Tuy nhiên, vắc-xin **cúm** có thể giảm nguy cơ biến chứng.'
  },

  // Nhóm 2: Lịch tiêm chủng và độ tuổi
  {
    question: 'Trẻ 10 tuổi cần tiêm vắc-xin gì?',
    answer: '- **Td** (mũi nhắc lại uốn ván - bạch hầu).\n- **HPV** (nếu là bé gái, bắt đầu từ 9 tuổi).'
  },
  {
    question: 'Người lớn 30 tuổi chưa tiêm vắc-xin nào thì nên tiêm gì?',
    answer: '- **Viêm gan A và B** (nếu chưa tiêm).\n- **Td** (nhắc lại mỗi 10 năm).\n- **Cúm** (hàng năm).'
  },
  {
    question: 'Trẻ 7 tuổi có cần tiêm vắc-xin viêm não Nhật Bản không?',
    answer: 'Nếu trẻ đã tiêm đủ 3 mũi viêm não Nhật Bản trước đó, có thể nhắc lại lúc 7 tuổi để tăng cường miễn dịch.'
  },
  {
    question: 'Phụ nữ 35 tuổi cần tiêm vắc-xin gì để phòng bệnh?',
    answer: '- **Td** (nhắc lại uốn ván - bạch hầu).\n- **Cúm** (hàng năm).\n- **Viêm gan A và B** (nếu chưa tiêm).'
  },
  {
    question: 'Trẻ 8 tuổi có cần tiêm vắc-xin phế cầu không?',
    answer:
      'Nếu trẻ chưa tiêm đủ lịch phế cầu (Prevenar 13 hoặc Synflorix) trước 5 tuổi, có thể cân nhắc tiêm bổ sung sau tư vấn bác sĩ.'
  },
  {
    question: 'Người 50 tuổi có cần tiêm vắc-xin viêm gan không?',
    answer:
      'Có, nếu chưa tiêm, người 50 tuổi nên tiêm **viêm gan A** và **viêm gan B** để bảo vệ gan, đặc biệt nếu có nguy cơ cao.'
  },
  {
    question: 'Trẻ 11 tuổi có cần tiêm vắc-xin MMR không?',
    answer:
      'Nếu trẻ chưa tiêm đủ 2 mũi MMR, nên tiêm bổ sung mũi còn lại để đảm bảo miễn dịch với sởi, quai bị, và rubella.'
  },
  {
    question: 'Người 25 tuổi có cần tiêm vắc-xin cúm không?',
    answer: 'Có, người 25 tuổi nên tiêm vắc-xin cúm hàng năm, đặc biệt nếu làm việc trong môi trường đông người.'
  },
  {
    question: 'Trẻ 13 tuổi có cần tiêm vắc-xin uốn ván không?',
    answer: 'Có, trẻ 13 tuổi nên tiêm nhắc lại **Td** (uốn ván - bạch hầu) để duy trì miễn dịch.'
  },
  {
    question: 'Người 45 tuổi có cần tiêm vắc-xin zona không?',
    answer:
      'Có, người từ 45 tuổi trở lên nên cân nhắc tiêm **Shingrix** để phòng bệnh zona thần kinh, đặc biệt nếu có nguy cơ cao.'
  },

  // Nhóm 3: Giá cả và chi phí
  {
    question: 'Giá vắc-xin Priorix tại VAXBOT là bao nhiêu?',
    answer: 'Vắc-xin Priorix (sởi, quai bị, rubella) giá khoảng **250.000 VND/liều** tại VAXBOT.'
  },
  {
    question: 'Vắc-xin Rotarix giá bao nhiêu một liều?',
    answer: 'Vắc-xin Rotarix (phòng tiêu chảy do Rotavirus) giá khoảng **650.000 VND/liều** tại VAXBOT.'
  },
  {
    question: 'Giá vắc-xin Vaxigrip tại VAXBOT là bao nhiêu?',
    answer: 'Vắc-xin Vaxigrip (cúm) giá khoảng **340.000 VND/liều** tại VAXBOT.'
  },
  {
    question: 'Vắc-xin Gardasil 9 giá bao nhiêu?',
    answer: 'Vắc-xin Gardasil 9 (HPV) giá khoảng **1.500.000 VND/liều** tại VAXBOT, cần 3 mũi.'
  },
  {
    question: 'Giá vắc-xin Synflorix tại VAXBOT là bao nhiêu?',
    answer: 'Vắc-xin Synflorix (phế cầu 10 loại) giá khoảng **900.000 VND/liều** tại VAXBOT.'
  },
  {
    question: 'Vắc-xin Hexaxim giá bao nhiêu một liều?',
    answer: 'Vắc-xin Hexaxim (6 trong 1) giá khoảng **1.000.000 VND/liều** tại VAXBOT.'
  },
  {
    question: 'Giá vắc-xin Infanrix tại VAXBOT là bao nhiêu?',
    answer: 'Vắc-xin Infanrix (5 trong 1) giá khoảng **680.000 VND/liều** tại VAXBOT.'
  },
  {
    question: 'Vắc-xin Cervarix giá bao nhiêu?',
    answer: 'Vắc-xin Cervarix (HPV) giá khoảng **1.100.000 VND/liều** tại VAXBOT, cần 3 mũi.'
  },
  {
    question: 'Giá gói vắc-xin cho trẻ 3-5 tuổi tại VAXBOT là bao nhiêu?',
    answer: 'Gói vắc-xin cho trẻ 3-5 tuổi tại VAXBOT giá khoảng **5-7 triệu VND**, tùy loại vắc-xin.'
  },
  {
    question: 'Vắc-xin Imojev (viêm não Nhật Bản) giá bao nhiêu?',
    answer: 'Vắc-xin Imojev (viêm não Nhật Bản) giá khoảng **350.000 VND/liều** tại VAXBOT.'
  },

  // Nhóm 4: Tác dụng phụ và chăm sóc sau tiêm
  {
    question: 'Sau khi tiêm vắc-xin có nên uống nhiều nước không?',
    answer: 'Có, uống nhiều nước sau tiêm giúp cơ thể thải độc và giảm nguy cơ sốt hoặc mệt mỏi.'
  },
  {
    question: 'Tiêm vắc-xin có gây đau đầu không?',
    answer: 'Hiếm gặp, nhưng một số người có thể bị đau đầu nhẹ do phản ứng miễn dịch, thường tự khỏi sau 1-2 ngày.'
  },
  {
    question: 'Sau tiêm vắc-xin có nên tắm ngay không?',
    answer: 'Có thể tắm, nhưng tránh chà xát mạnh chỗ tiêm và giữ chỗ tiêm khô ráo trong 24 giờ đầu.'
  },
  {
    question: 'Tiêm vắc-xin có gây buồn nôn không?',
    answer: 'Hiếm gặp, nhưng một số người nhạy cảm có thể bị buồn nôn nhẹ, thường tự khỏi sau vài giờ.'
  },
  {
    question: 'Sau tiêm vắc-xin có nên ăn đồ chua không?',
    answer: 'Có thể ăn đồ chua, nhưng nên ăn nhẹ và tránh đồ kích thích dạ dày nếu cảm thấy mệt mỏi sau tiêm.'
  },
  {
    question: 'Tiêm vắc-xin có gây đau cơ không?',
    answer:
      'Có thể, đặc biệt với vắc-xin như **Td** hoặc **DPT**, gây đau cơ nhẹ tại chỗ tiêm, thường tự khỏi sau 1-2 ngày.'
  },
  {
    question: 'Sau tiêm vắc-xin có nên uống sữa không?',
    answer: 'Có, uống sữa không ảnh hưởng đến hiệu quả vắc-xin và có thể giúp cơ thể phục hồi tốt hơn.'
  },
  {
    question: 'Tiêm vắc-xin có gây ngứa toàn thân không?',
    answer: 'Hiếm gặp, nhưng nếu ngứa toàn thân sau tiêm, có thể là dấu hiệu dị ứng, cần liên hệ bác sĩ ngay.'
  },
  {
    question: 'Sau tiêm vắc-xin có nên uống thuốc giảm đau không?',
    answer: 'Có thể uống nếu đau hoặc sốt nhiều, nhưng nên tham khảo ý kiến bác sĩ, thường dùng paracetamol.'
  },
  {
    question: 'Tiêm vắc-xin có gây mất ngủ không?',
    answer: 'Hiếm gặp, nhưng nếu cảm thấy khó chịu hoặc sốt nhẹ sau tiêm, có thể ảnh hưởng giấc ngủ tạm thời.'
  },

  // Nhóm 5: Dịch vụ và quy trình tại VAXBOT
  {
    question: 'VAXBOT có hỗ trợ tiêm vắc-xin cho người bị dị ứng thuốc không?',
    answer: 'Có, nhưng cần báo trước cho bác sĩ về tiền sử dị ứng để được khám sàng lọc kỹ lưỡng.'
  },
  {
    question: 'VAXBOT có hỗ trợ tiêm vắc-xin cho người bị bệnh tim không?',
    answer: 'Có, nhưng cần bác sĩ chuyên khoa tim mạch đánh giá trước khi tiêm để đảm bảo an toàn.'
  },
  {
    question: 'VAXBOT có hỗ trợ tiêm vắc-xin cho người bị bệnh gan không?',
    answer: 'Có, nhưng cần báo tình trạng bệnh gan để bác sĩ tư vấn loại vắc-xin phù hợp.'
  },
  {
    question: 'VAXBOT có hỗ trợ tiêm vắc-xin cho người bị bệnh phổi không?',
    answer: 'Có, người bị bệnh phổi vẫn có thể tiêm, nhưng cần khám sàng lọc kỹ và báo tình trạng sức khỏe.'
  },
  {
    question: 'VAXBOT có hỗ trợ tiêm vắc-xin cho người bị bệnh thận không?',
    answer: 'Có, nhưng cần bác sĩ chuyên khoa thận đánh giá trước khi tiêm để đảm bảo an toàn.'
  },
  {
    question: 'VAXBOT có hỗ trợ tiêm vắc-xin cho người bị bệnh tự miễn không?',
    answer: 'Có, nhưng cần bác sĩ chuyên khoa đánh giá, vì một số vắc-xin có thể không phù hợp với bệnh tự miễn.'
  },
  {
    question: 'VAXBOT có hỗ trợ tiêm vắc-xin cho người bị bệnh tiểu đường loại 2 không?',
    answer: 'Có, người bị tiểu đường loại 2 có thể tiêm vắc-xin bình thường, nhưng nên kiểm tra đường huyết trước.'
  },
  {
    question: 'VAXBOT có hỗ trợ tiêm vắc-xin cho người bị bệnh huyết áp thấp không?',
    answer: 'Có, nhưng cần đo huyết áp trước tiêm và báo bác sĩ nếu huyết áp quá thấp.'
  },
  {
    question: 'VAXBOT có hỗ trợ tiêm vắc-xin cho người bị bệnh gout không?',
    answer: 'Có, người bị gout có thể tiêm vắc-xin bình thường, nhưng nên báo bác sĩ nếu đang có đợt gout cấp.'
  },
  {
    question: 'VAXBOT có hỗ trợ tiêm vắc-xin cho người bị bệnh Parkinson không?',
    answer: 'Có, người bị Parkinson có thể tiêm vắc-xin, nhưng cần báo bác sĩ để được theo dõi kỹ sau tiêm.'
  },

  // Nhóm 6: Tình huống đặc biệt
  {
    question: 'Người bị bệnh vảy nến có tiêm vắc-xin được không?',
    answer: 'Được, nhưng cần báo bác sĩ nếu đang dùng thuốc ức chế miễn dịch để đánh giá trước khi tiêm.'
  },
  {
    question: 'Người bị bệnh lupus có tiêm vắc-xin được không?',
    answer: 'Được, nhưng cần bác sĩ chuyên khoa đánh giá, vì một số vắc-xin có thể không phù hợp với bệnh lupus.'
  },
  {
    question: 'Người bị bệnh bạch cầu có tiêm vắc-xin được không?',
    answer: 'Cần bác sĩ chuyên khoa huyết học đánh giá, vì người bị bạch cầu có thể không tiêm được một số vắc-xin.'
  },
  {
    question: 'Người bị bệnh thiếu máu hồng cầu hình liềm có tiêm vắc-xin được không?',
    answer: 'Được, nhưng cần bác sĩ đánh giá tình trạng sức khỏe trước khi tiêm để đảm bảo an toàn.'
  },
  {
    question: 'Người bị bệnh động kinh có tiêm vắc-xin được không?',
    answer: 'Được, nhưng cần báo bác sĩ nếu đang dùng thuốc chống động kinh để được theo dõi sau tiêm.'
  },
  {
    question: 'Người bị bệnh viêm đa khớp dạng thấp có tiêm vắc-xin được không?',
    answer: 'Được, nhưng cần bác sĩ đánh giá nếu đang dùng thuốc ức chế miễn dịch để tránh ảnh hưởng.'
  },
  {
    question: 'Người bị bệnh suy giáp có tiêm vắc-xin được không?',
    answer: 'Được, suy giáp không ảnh hưởng đến việc tiêm vắc-xin, nhưng nên báo bác sĩ nếu đang dùng thuốc.'
  },
  {
    question: 'Người bị bệnh cường giáp có tiêm vắc-xin được không?',
    answer: 'Được, nhưng cần báo bác sĩ nếu đang điều trị cường giáp để được theo dõi kỹ.'
  },
  {
    question: 'Người bị bệnh viêm đại tràng có tiêm vắc-xin được không?',
    answer: 'Được, nhưng cần hoãn tiêm nếu đang có đợt viêm cấp tính, nên tham khảo ý kiến bác sĩ.'
  },
  {
    question: 'Người bị bệnh Crohn có tiêm vắc-xin được không?',
    answer: 'Được, nhưng cần bác sĩ chuyên khoa tiêu hóa đánh giá, đặc biệt nếu đang dùng thuốc ức chế miễn dịch.'
  },

  // Nhóm 7: Câu hỏi về sức khỏe cộng đồng
  {
    question: 'Tiêm vắc-xin có giúp giảm nguy cơ bệnh tim không?',
    answer: 'Gián tiếp, vắc-xin như **cúm** và **phế cầu** có thể giảm nguy cơ biến chứng tim mạch do nhiễm trùng.'
  },
  {
    question: 'Tiêm vắc-xin có giúp giảm nguy cơ đột quỵ không?',
    answer: 'Gián tiếp, vắc-xin như **cúm** có thể giảm nguy cơ đột quỵ do giảm viêm và nhiễm trùng liên quan.'
  },
  {
    question: 'Tiêm vắc-xin có giúp giảm nguy cơ bệnh thận không?',
    answer: 'Gián tiếp, vắc-xin như **viêm gan B** có thể giảm nguy cơ tổn thương thận do nhiễm virus.'
  },
  {
    question: 'Tiêm vắc-xin có giúp giảm nguy cơ bệnh gan không?',
    answer: 'Có, vắc-xin **viêm gan A** và **viêm gan B** giúp bảo vệ gan, giảm nguy cơ viêm gan và xơ gan.'
  },
  {
    question: 'Tiêm vắc-xin có giúp giảm nguy cơ bệnh phổi không?',
    answer: 'Có, vắc-xin **phế cầu** và **cúm** giúp giảm nguy cơ viêm phổi và các bệnh phổi khác.'
  },
  {
    question: 'Tiêm vắc-xin có giúp giảm nguy cơ bệnh thần kinh không?',
    answer: 'Gián tiếp, vắc-xin như **zona** (Shingrix) có thể giảm nguy cơ đau thần kinh sau zona.'
  },
  {
    question: 'Tiêm vắc-xin có giúp giảm nguy cơ bệnh mắt không?',
    answer: 'Gián tiếp, vắc-xin như **MMR** có thể giảm nguy cơ biến chứng mắt do sởi hoặc rubella.'
  },
  {
    question: 'Tiêm vắc-xin có giúp giảm nguy cơ bệnh tai không?',
    answer: 'Có, vắc-xin **phế cầu** (Prevenar 13) giúp giảm nguy cơ viêm tai giữa ở trẻ em.'
  },
  {
    question: 'Tiêm vắc-xin có giúp giảm nguy cơ bệnh da liễu không?',
    answer: 'Gián tiếp, vắc-xin như **thủy đậu** và **zona** có thể giảm nguy cơ bệnh da liễu liên quan đến virus.'
  },
  {
    question: 'Tiêm vắc-xin có giúp giảm nguy cơ bệnh tiêu hóa không?',
    answer: 'Có, vắc-xin **Rotavirus** giúp giảm nguy cơ tiêu chảy do virus ở trẻ em.'
  },

  // Nhóm 8: Câu hỏi về bảo quản và vận chuyển
  {
    question: 'Vắc-xin có thể để ở nhiệt độ phòng bao lâu?',
    answer:
      'Không nên để ở nhiệt độ phòng quá **30 phút**, vì vắc-xin cần được bảo quản ở **2-8°C** để đảm bảo chất lượng.'
  },
  {
    question: 'Vắc-xin có thể bảo quản trong tủ lạnh gia đình không?',
    answer: 'Không nên, tủ lạnh gia đình không đảm bảo nhiệt độ ổn định **2-8°C**, dễ làm hỏng vắc-xin.'
  },
  {
    question: 'Vắc-xin có thể vận chuyển bằng xe máy không?',
    answer: 'Không nên, vắc-xin cần được vận chuyển trong thùng lạnh chuyên dụng để duy trì nhiệt độ **2-8°C**.'
  },
  {
    question: 'Vắc-xin có bị ảnh hưởng bởi ánh sáng không?',
    answer: 'Có, một số vắc-xin nhạy cảm với ánh sáng, cần được bảo quản trong hộp kín, tránh ánh sáng trực tiếp.'
  },
  {
    question: 'Vắc-xin có thể bảo quản trong ngăn đá không?',
    answer: 'Không, ngăn đá có nhiệt độ dưới 0°C, có thể làm đông lạnh và làm hỏng vắc-xin.'
  },
  {
    question: 'Vắc-xin có thể bảo quản trong túi giữ nhiệt không?',
    answer: 'Có thể trong thời gian ngắn, nhưng cần có đá lạnh và đảm bảo nhiệt độ **2-8°C**, không quá 2 giờ.'
  },
  {
    question: 'Vắc-xin có bị ảnh hưởng bởi độ ẩm không?',
    answer: 'Có, độ ẩm cao có thể ảnh hưởng đến chất lượng vắc-xin, cần bảo quản ở nơi khô ráo.'
  },
  {
    question: 'Vắc-xin có thể bảo quản trong hộp nhựa không?',
    answer: 'Không nên, hộp nhựa không đảm bảo nhiệt độ và độ kín, dễ làm hỏng vắc-xin.'
  },
  {
    question: 'Vắc-xin có thể bảo quản trong túi nilon không?',
    answer: 'Không, túi nilon không giữ được nhiệt độ và độ kín, dễ làm hỏng vắc-xin.'
  },
  {
    question: 'Vắc-xin có thể bảo quản trong thùng xốp không?',
    answer: 'Có thể trong thời gian ngắn, nhưng cần có đá lạnh và đảm bảo nhiệt độ **2-8°C**, không quá 2 giờ.'
  },

  // Nhóm 9: Câu hỏi về tiêm chủng và du lịch
  {
    question: 'Vắc-xin nào cần tiêm khi đi Đông Nam Á?',
    answer: '- **Viêm gan A**.\n- **Thương hàn**.\n- **Viêm não Nhật Bản** (nếu đi khu vực nguy cơ cao).'
  },
  {
    question: 'Vắc-xin nào cần tiêm khi đi Ấn Độ?',
    answer: '- **Viêm gan A**.\n- **Thương hàn**.\n- **Sốt vàng** (nếu đi qua khu vực có nguy cơ).'
  },
  {
    question: 'Vắc-xin nào cần tiêm khi đi Úc?',
    answer: '- **Cúm**.\n- **MMR** (nếu chưa tiêm đủ).\n- **Td** (nhắc lại nếu cần).'
  },
  {
    question: 'Vắc-xin nào cần tiêm khi đi Nhật Bản?',
    answer: '- **Viêm gan A**.\n- **Viêm não Nhật Bản**.\n- **Cúm** (đặc biệt vào mùa đông).'
  },
  {
    question: 'Vắc-xin nào cần tiêm khi đi Hàn Quốc?',
    answer: '- **Viêm gan A**.\n- **Cúm** (vào mùa đông).\n- **Td** (nhắc lại nếu cần).'
  },
  {
    question: 'Vắc-xin nào cần tiêm khi đi châu Âu?',
    answer: '- **Cúm**.\n- **MMR** (nếu chưa tiêm đủ).\n- **Td** (nhắc lại mỗi 10 năm).'
  },
  {
    question: 'Vắc-xin nào cần tiêm khi đi Trung Đông?',
    answer: '- **Viêm gan A**.\n- **Thương hàn**.\n- **Viêm màng não** (đặc biệt nếu đi hành hương).'
  },
  {
    question: 'Vắc-xin nào cần tiêm khi đi Nam Phi?',
    answer: '- **Sốt vàng**.\n- **Viêm gan A**.\n- **Thương hàn**.'
  },
  {
    question: 'Vắc-xin nào cần tiêm khi đi Brazil?',
    answer: '- **Sốt vàng**.\n- **Viêm gan A**.\n- **Thương hàn**.'
  },
  {
    question: 'Vắc-xin nào cần tiêm khi đi Canada?',
    answer: '- **Cúm** (vào mùa đông).\n- **MMR** (nếu chưa tiêm đủ).\n- **Td** (nhắc lại nếu cần).'
  },

  // Nhóm 10: Câu hỏi khác
  {
    question: 'Tiêm vắc-xin có ảnh hưởng đến kết quả xét nghiệm nước tiểu không?',
    answer: 'Không đáng kể, nhưng nên đợi 1-2 ngày sau tiêm để xét nghiệm nước tiểu cho chính xác.'
  },
  {
    question: 'Tiêm vắc-xin có ảnh hưởng đến kết quả chụp X-quang không?',
    answer: 'Không, tiêm vắc-xin không ảnh hưởng đến kết quả chụp X-quang.'
  },
  {
    question: 'Tiêm vắc-xin có ảnh hưởng đến kết quả nội soi không?',
    answer: 'Không, tiêm vắc-xin không ảnh hưởng đến kết quả nội soi.'
  },
  {
    question: 'Tiêm vắc-xin có ảnh hưởng đến kết quả siêu âm không?',
    answer: 'Không, tiêm vắc-xin không ảnh hưởng đến kết quả siêu âm.'
  },
  {
    question: 'Tiêm vắc-xin có ảnh hưởng đến kết quả xét nghiệm HIV không?',
    answer: 'Không, nhưng nên đợi 1-2 ngày sau tiêm để tránh nhiễu kết quả do phản ứng miễn dịch.'
  },
  {
    question: 'Tiêm vắc-xin có ảnh hưởng đến kết quả xét nghiệm chức năng gan không?',
    answer: 'Không đáng kể, nhưng nên đợi 1-2 ngày sau tiêm để kết quả chính xác hơn.'
  },
  {
    question: 'Tiêm vắc-xin có ảnh hưởng đến kết quả xét nghiệm chức năng thận không?',
    answer: 'Không đáng kể, nhưng nên đợi 1-2 ngày sau tiêm để kết quả chính xác hơn.'
  },
  {
    question: 'Tiêm vắc-xin có ảnh hưởng đến kết quả xét nghiệm mỡ máu không?',
    answer: 'Không, tiêm vắc-xin không ảnh hưởng đến kết quả xét nghiệm mỡ máu.'
  },
  {
    question: 'Tiêm vắc-xin có ảnh hưởng đến kết quả xét nghiệm đường huyết không?',
    answer: 'Không đáng kể, nhưng người tiểu đường nên theo dõi đường huyết sau tiêm để yên tâm.'
  },
  {
    question: 'Tiêm vắc-xin có ảnh hưởng đến kết quả xét nghiệm chức năng tuyến giáp không?',
    answer: 'Không, tiêm vắc-xin không ảnh hưởng đến kết quả xét nghiệm chức năng tuyến giáp.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh viêm khớp do vi khuẩn?',
    answer:
      'Hiện chưa có vắc-xin đặc hiệu phòng viêm khớp do vi khuẩn tại VAXBOT. Tuy nhiên, vắc-xin **phế cầu** có thể giảm nguy cơ từ vi khuẩn liên quan.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh viêm ruột do vi khuẩn E.coli?',
    answer:
      'Hiện chưa có vắc-xin đặc hiệu phòng viêm ruột do E.coli tại VAXBOT. Bạn nên duy trì vệ sinh thực phẩm để giảm nguy cơ.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh viêm màng tim do virus?',
    answer:
      'Hiện chưa có vắc-xin đặc hiệu phòng viêm màng tim do virus tại VAXBOT. Tuy nhiên, vắc-xin **cúm** có thể giảm nguy cơ biến chứng.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh viêm amidan do liên cầu khuẩn?',
    answer:
      'Hiện chưa có vắc-xin đặc hiệu phòng viêm amidan do liên cầu khuẩn tại VAXBOT. Vắc-xin **phế cầu** có thể giảm nguy cơ gián tiếp.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh viêm tuyến giáp Hashimoto?',
    answer:
      'Hiện chưa có vắc-xin phòng bệnh viêm tuyến giáp Hashimoto tại VAXBOT, vì đây là bệnh tự miễn, không do virus hay vi khuẩn.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh viêm phế quản mãn tính?',
    answer:
      'Hiện chưa có vắc-xin đặc hiệu phòng viêm phế quản mãn tính tại VAXBOT. Tuy nhiên, vắc-xin **cúm** và **phế cầu** có thể giảm nguy cơ biến chứng.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh viêm dạ dày do Helicobacter pylori?',
    answer:
      'Hiện chưa có vắc-xin đặc hiệu phòng viêm dạ dày do Helicobacter pylori tại VAXBOT. Bạn nên duy trì vệ sinh ăn uống để giảm nguy cơ.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh viêm tụy do virus?',
    answer:
      'Hiện chưa có vắc-xin đặc hiệu phòng viêm tụy do virus tại VAXBOT. Vắc-xin **MMR** có thể giảm nguy cơ từ virus quai bị.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh viêm thận do vi khuẩn?',
    answer:
      'Hiện chưa có vắc-xin đặc hiệu phòng viêm thận do vi khuẩn tại VAXBOT. Vắc-xin **phế cầu** có thể giảm nguy cơ gián tiếp.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh viêm màng phổi do vi khuẩn?',
    answer:
      'Hiện chưa có vắc-xin đặc hiệu phòng viêm màng phổi do vi khuẩn tại VAXBOT. Vắc-xin **phế cầu** và **cúm** có thể giảm nguy cơ biến chứng.'
  },

  // Nhóm 2: Lịch tiêm chủng và độ tuổi
  {
    question: 'Trẻ 14 tuổi cần tiêm vắc-xin gì để phòng bệnh?',
    answer: '- **Td** (mũi nhắc lại uốn ván - bạch hầu).\n- **HPV** (nếu chưa tiêm, dành cho cả nam và nữ).'
  },
  {
    question: 'Người lớn 40 tuổi chưa tiêm vắc-xin nào thì nên tiêm gì?',
    answer: '- **Viêm gan A và B** (nếu chưa tiêm).\n- **Td** (nhắc lại mỗi 10 năm).\n- **Cúm** (hàng năm).'
  },
  {
    question: 'Trẻ 6 tuổi có cần tiêm vắc-xin sởi không?',
    answer: 'Nếu trẻ đã tiêm đủ 2 mũi sởi (9 tháng và 18 tháng), không cần tiêm thêm. Nếu chưa đủ, nên tiêm bổ sung.'
  },
  {
    question: 'Phụ nữ 28 tuổi cần tiêm vắc-xin gì trước khi sinh con?',
    answer: '- **MMR** (nếu chưa tiêm đủ, ít nhất 1 tháng trước khi mang thai).\n- **Td** (uốn ván - bạch hầu).'
  },
  {
    question: 'Trẻ 9 tuổi có cần tiêm vắc-xin thủy đậu không?',
    answer: 'Nếu trẻ chưa tiêm đủ 2 mũi thủy đậu, nên tiêm bổ sung mũi còn lại để đảm bảo miễn dịch.'
  },
  {
    question: 'Người 55 tuổi có cần tiêm vắc-xin phế cầu không?',
    answer: 'Có, người từ 55 tuổi trở lên nên tiêm **Pneumovax 23** để phòng viêm phổi do phế cầu.'
  },
  {
    question: 'Trẻ 12 tuổi có cần tiêm vắc-xin viêm gan B không?',
    answer: 'Nếu trẻ chưa tiêm đủ 3 mũi viêm gan B, nên tiêm bổ sung để đảm bảo miễn dịch.'
  },
  {
    question: 'Người 20 tuổi có cần tiêm vắc-xin viêm não Nhật Bản không?',
    answer:
      'Nếu chưa tiêm và sống ở khu vực nguy cơ cao, người 20 tuổi có thể tiêm **Imojev** để phòng viêm não Nhật Bản.'
  },
  {
    question: 'Trẻ 15 tuổi có cần tiêm vắc-xin cúm không?',
    answer: 'Có, trẻ 15 tuổi nên tiêm vắc-xin cúm hàng năm, đặc biệt nếu có nguy cơ cao hoặc vào mùa lạnh.'
  },
  {
    question: 'Người 70 tuổi có cần tiêm vắc-xin uốn ván không?',
    answer: 'Có, người 70 tuổi nên tiêm nhắc lại **Td** mỗi 10 năm để duy trì miễn dịch.'
  },

  // Nhóm 3: Giá cả và chi phí
  {
    question: 'Giá vắc-xin Havrix tại VAXBOT là bao nhiêu?',
    answer: 'Vắc-xin Havrix (viêm gan A) giá khoảng **600.000 VND/liều** tại VAXBOT.'
  },
  {
    question: 'Vắc-xin Zostavax giá bao nhiêu một liều?',
    answer: 'Vắc-xin Zostavax (phòng zona) giá khoảng **1.200.000 VND/liều** tại VAXBOT.'
  },
  {
    question: 'Giá vắc-xin Meningococcal tại VAXBOT là bao nhiêu?',
    answer: 'Vắc-xin Meningococcal (viêm màng não) giá khoảng **1.100.000 VND/liều** tại VAXBOT.'
  },
  {
    question: 'Vắc-xin Abhayrab giá bao nhiêu?',
    answer: 'Vắc-xin Abhayrab (phòng dại) giá khoảng **340.000 VND/liều** tại VAXBOT.'
  },
  {
    question: 'Giá vắc-xin Twinrix tại VAXBOT là bao nhiêu?',
    answer: 'Vắc-xin Twinrix (viêm gan A+B) giá khoảng **800.000 VND/liều** tại VAXBOT, cần 3 mũi.'
  },
  {
    question: 'Vắc-xin Varilrix giá bao nhiêu một liều?',
    answer: 'Vắc-xin Varilrix (thủy đậu) giá khoảng **720.000 VND/liều** tại VAXBOT.'
  },
  {
    question: 'Giá vắc-xin Fluarix tại VAXBOT là bao nhiêu?',
    answer: 'Vắc-xin Fluarix (cúm) giá khoảng **360.000 VND/liều** tại VAXBOT.'
  },
  {
    question: 'Vắc-xin Engerix B giá bao nhiêu?',
    answer: 'Vắc-xin Engerix B (viêm gan B) giá khoảng **280.000 VND/liều** tại VAXBOT.'
  },
  {
    question: 'Giá gói vắc-xin cho trẻ 6-12 tháng tại VAXBOT là bao nhiêu?',
    answer: 'Gói vắc-xin cho trẻ 6-12 tháng tại VAXBOT giá khoảng **8-10 triệu VND**, tùy loại vắc-xin.'
  },
  {
    question: 'Vắc-xin Adacel giá bao nhiêu?',
    answer: 'Vắc-xin Adacel (bạch hầu, ho gà, uốn ván) giá khoảng **750.000 VND/liều** tại VAXBOT.'
  },

  // Nhóm 4: Tác dụng phụ và chăm sóc sau tiêm
  {
    question: 'Tiêm vắc-xin có gây đau bụng không?',
    answer:
      'Hiếm gặp, nhưng một số người nhạy cảm có thể bị đau bụng nhẹ do phản ứng miễn dịch, thường tự khỏi sau 1-2 ngày.'
  },
  {
    question: 'Sau tiêm vắc-xin có nên ăn đồ lạnh không?',
    answer: 'Có thể ăn, nhưng nên hạn chế nếu cảm thấy mệt mỏi hoặc sốt nhẹ sau tiêm.'
  },
  {
    question: 'Tiêm vắc-xin có gây chóng mặt không?',
    answer:
      'Hiếm gặp, nhưng một số người có thể bị chóng mặt nhẹ do căng thẳng hoặc phản ứng miễn dịch, nên nghỉ ngơi sau tiêm.'
  },
  {
    question: 'Sau tiêm vắc-xin có nên uống cà phê không?',
    answer: 'Nên hạn chế uống cà phê ngay sau tiêm, vì caffeine có thể làm tăng cảm giác mệt mỏi hoặc khó chịu.'
  },
  {
    question: 'Tiêm vắc-xin có gây đau vai không?',
    answer: 'Có thể, nếu tiêm ở vùng vai, có thể gây đau nhẹ tại chỗ tiêm, thường tự khỏi sau 1-2 ngày.'
  },
  {
    question: 'Sau tiêm vắc-xin có nên ăn hải sản không?',
    answer: 'Có thể ăn, nhưng nếu có tiền sử dị ứng hải sản, nên tránh để không nhầm lẫn với phản ứng sau tiêm.'
  },
  {
    question: 'Tiêm vắc-xin có gây khó thở không?',
    answer: 'Hiếm gặp, nhưng nếu khó thở sau tiêm, có thể là dấu hiệu dị ứng nghiêm trọng, cần liên hệ bác sĩ ngay.'
  },
  {
    question: 'Sau tiêm vắc-xin có nên uống nước dừa không?',
    answer: 'Có, nước dừa giúp bổ sung nước và điện giải, hỗ trợ cơ thể phục hồi sau tiêm.'
  },
  {
    question: 'Tiêm vắc-xin có gây đau lưng không?',
    answer: 'Hiếm gặp, nhưng nếu có đau lưng sau tiêm, có thể do tư thế ngồi hoặc nằm không thoải mái, nên nghỉ ngơi.'
  },
  {
    question: 'Sau tiêm vắc-xin có nên ăn đồ cay không?',
    answer: 'Nên hạn chế đồ cay ngay sau tiêm, vì có thể gây khó chịu cho dạ dày nếu cơ thể đang mệt mỏi.'
  },

  // Nhóm 5: Dịch vụ và quy trình tại VAXBOT
  {
    question: 'VAXBOT có hỗ trợ tiêm vắc-xin cho người bị bệnh máu khó đông không?',
    answer: 'Có, nhưng cần bác sĩ chuyên khoa huyết học đánh giá và theo dõi kỹ để tránh nguy cơ chảy máu.'
  },
  {
    question: 'VAXBOT có hỗ trợ tiêm vắc-xin cho người bị bệnh viêm gan mãn tính không?',
    answer: 'Có, nhưng cần báo tình trạng viêm gan để bác sĩ tư vấn loại vắc-xin phù hợp, tránh ảnh hưởng đến gan.'
  },
  {
    question: 'VAXBOT có hỗ trợ tiêm vắc-xin cho người bị bệnh suy tim không?',
    answer: 'Có, nhưng cần bác sĩ chuyên khoa tim mạch đánh giá trước khi tiêm để đảm bảo an toàn.'
  },
  {
    question: 'VAXBOT có hỗ trợ tiêm vắc-xin cho người bị bệnh viêm khớp mãn tính không?',
    answer: 'Có, nhưng cần báo bác sĩ nếu đang dùng thuốc ức chế miễn dịch để đánh giá trước khi tiêm.'
  },
  {
    question: 'VAXBOT có hỗ trợ tiêm vắc-xin cho người bị bệnh loét dạ dày mãn tính không?',
    answer:
      'Có, loét dạ dày mãn tính không ảnh hưởng đến việc tiêm vắc-xin, nhưng nên báo bác sĩ nếu đang có triệu chứng cấp.'
  },
  {
    question: 'VAXBOT có hỗ trợ tiêm vắc-xin cho người bị bệnh viêm gan tự miễn không?',
    answer: 'Có, nhưng cần bác sĩ chuyên khoa đánh giá, vì một số vắc-xin có thể không phù hợp với bệnh tự miễn.'
  },
  {
    question: 'VAXBOT có hỗ trợ tiêm vắc-xin cho người bị bệnh viêm phổi mãn tính không?',
    answer: 'Có, nhưng cần bác sĩ chuyên khoa phổi đánh giá trước khi tiêm để đảm bảo an toàn.'
  },
  {
    question: 'VAXBOT có hỗ trợ tiêm vắc-xin cho người bị bệnh thận mãn tính không?',
    answer: 'Có, nhưng cần bác sĩ chuyên khoa thận đánh giá trước khi tiêm để đảm bảo an toàn.'
  },
  {
    question: 'VAXBOT có hỗ trợ tiêm vắc-xin cho người bị bệnh tiểu đường loại 1 không?',
    answer: 'Có, người bị tiểu đường loại 1 có thể tiêm vắc-xin bình thường, nhưng nên kiểm tra đường huyết trước.'
  },
  {
    question: 'VAXBOT có hỗ trợ tiêm vắc-xin cho người bị bệnh thần kinh ngoại biên không?',
    answer: 'Có, người bị thần kinh ngoại biên có thể tiêm vắc-xin, nhưng cần báo bác sĩ để được theo dõi sau tiêm.'
  },

  // Nhóm 6: Tình huống đặc biệt
  {
    question: 'Người bị bệnh viêm gan siêu vi C có tiêm vắc-xin được không?',
    answer: 'Có, nhưng cần bác sĩ chuyên khoa gan đánh giá, tránh các vắc-xin có thể ảnh hưởng đến gan.'
  },
  {
    question: 'Người bị bệnh viêm gan siêu vi B có tiêm vắc-xin được không?',
    answer: 'Có, nhưng cần bác sĩ đánh giá, vì một số vắc-xin như viêm gan B không cần thiết nếu đã nhiễm.'
  },
  {
    question: 'Người bị bệnh viêm gan tự miễn có tiêm vắc-xin được không?',
    answer: 'Có, nhưng cần bác sĩ chuyên khoa đánh giá, vì một số vắc-xin có thể không phù hợp với bệnh tự miễn.'
  },
  {
    question: 'Người bị bệnh viêm khớp dạng thấp có tiêm vắc-xin được không?',
    answer: 'Có, nhưng cần bác sĩ đánh giá nếu đang dùng thuốc ức chế miễn dịch để tránh ảnh hưởng.'
  },
  {
    question: 'Người bị bệnh viêm loét đại tràng mãn tính có tiêm vắc-xin được không?',
    answer: 'Có, nhưng cần hoãn tiêm nếu đang có đợt viêm cấp tính, nên tham khảo ý kiến bác sĩ.'
  },
  {
    question: 'Người bị bệnh viêm gan mãn tính có tiêm vắc-xin được không?',
    answer: 'Có, nhưng cần báo tình trạng viêm gan để bác sĩ tư vấn loại vắc-xin phù hợp.'
  },
  {
    question: 'Người bị bệnh viêm phổi mãn tính có tiêm vắc-xin được không?',
    answer: 'Có, nhưng cần bác sĩ chuyên khoa phổi đánh giá trước khi tiêm để đảm bảo an toàn.'
  },
  {
    question: 'Người bị bệnh thận mãn tính có tiêm vắc-xin được không?',
    answer: 'Có, nhưng cần bác sĩ chuyên khoa thận đánh giá trước khi tiêm để đảm bảo an toàn.'
  },
  {
    question: 'Người bị bệnh tiểu đường loại 1 có tiêm vắc-xin được không?',
    answer: 'Có, người bị tiểu đường loại 1 có thể tiêm vắc-xin bình thường, nhưng nên kiểm tra đường huyết trước.'
  },
  {
    question: 'Người bị bệnh thần kinh ngoại biên có tiêm vắc-xin được không?',
    answer: 'Có, người bị thần kinh ngoại biên có thể tiêm vắc-xin, nhưng cần báo bác sĩ để được theo dõi sau tiêm.'
  },

  // Nhóm 7: Câu hỏi về sức khỏe cộng đồng
  {
    question: 'Tiêm vắc-xin có giúp giảm nguy cơ bệnh ung thư không?',
    answer:
      'Có, vắc-xin như **HPV** (phòng ung thư cổ tử cung) và **viêm gan B** (phòng ung thư gan) giúp giảm nguy cơ ung thư.'
  },
  {
    question: 'Tiêm vắc-xin có giúp giảm nguy cơ bệnh tiểu đường không?',
    answer: 'Không trực tiếp, nhưng vắc-xin như **cúm** có thể giảm nguy cơ biến chứng ở người tiểu đường.'
  },
  {
    question: 'Tiêm vắc-xin có giúp giảm nguy cơ bệnh huyết áp cao không?',
    answer: 'Không trực tiếp, nhưng vắc-xin như **cúm** có thể giảm nguy cơ biến chứng tim mạch liên quan đến huyết áp.'
  },
  {
    question: 'Tiêm vắc-xin có giúp giảm nguy cơ bệnh loãng xương không?',
    answer:
      'Không trực tiếp, nhưng vắc-xin như **Td** có thể giảm nguy cơ nhiễm trùng từ vết thương, gián tiếp bảo vệ sức khỏe xương.'
  },
  {
    question: 'Tiêm vắc-xin có giúp giảm nguy cơ bệnh suy thận không?',
    answer: 'Gián tiếp, vắc-xin như **viêm gan B** có thể giảm nguy cơ tổn thương thận do nhiễm virus.'
  },
  {
    question: 'Tiêm vắc-xin có giúp giảm nguy cơ bệnh suy tim không?',
    answer: 'Gián tiếp, vắc-xin như **cúm** và **phế cầu** có thể giảm nguy cơ biến chứng tim mạch do nhiễm trùng.'
  },
  {
    question: 'Tiêm vắc-xin có giúp giảm nguy cơ bệnh viêm khớp không?',
    answer: 'Gián tiếp, vắc-xin như **phế cầu** có thể giảm nguy cơ viêm khớp do vi khuẩn.'
  },
  {
    question: 'Tiêm vắc-xin có giúp giảm nguy cơ bệnh viêm ruột không?',
    answer: 'Có, vắc-xin **Rotavirus** giúp giảm nguy cơ viêm ruột do virus ở trẻ em.'
  },
  {
    question: 'Tiêm vắc-xin có giúp giảm nguy cơ bệnh viêm gan không?',
    answer: 'Có, vắc-xin **viêm gan A** và **viêm gan B** giúp bảo vệ gan, giảm nguy cơ viêm gan.'
  },
  {
    question: 'Tiêm vắc-xin có giúp giảm nguy cơ bệnh viêm màng tim không?',
    answer: 'Gián tiếp, vắc-xin như **cúm** có thể giảm nguy cơ biến chứng viêm màng tim do virus.'
  },

  // Nhóm 8: Câu hỏi về bảo quản và vận chuyển
  {
    question: 'Vắc-xin có thể bảo quản trong tủ đông không?',
    answer: 'Không, tủ đông có nhiệt độ quá thấp (dưới 0°C), có thể làm đông lạnh và làm hỏng vắc-xin.'
  },
  {
    question: 'Vắc-xin có thể bảo quản trong hộp cách nhiệt không?',
    answer: 'Có thể trong thời gian ngắn, nhưng cần có đá lạnh và đảm bảo nhiệt độ **2-8°C**, không quá 2 giờ.'
  },
  {
    question: 'Vắc-xin có bị ảnh hưởng bởi nhiệt độ cao không?',
    answer: 'Có, nhiệt độ trên **8°C** có thể làm giảm hiệu quả vắc-xin, cần bảo quản ở **2-8°C**.'
  },
  {
    question: 'Vắc-xin có thể bảo quản trong túi vải không?',
    answer: 'Không, túi vải không giữ được nhiệt độ và độ kín, dễ làm hỏng vắc-xin.'
  },
  {
    question: 'Vắc-xin có thể bảo quản trong hộp gỗ không?',
    answer: 'Không, hộp gỗ không đảm bảo nhiệt độ và độ kín, dễ làm hỏng vắc-xin.'
  },
  {
    question: 'Vắc-xin có thể bảo quản trong túi giấy không?',
    answer: 'Không, túi giấy không giữ được nhiệt độ và độ kín, dễ làm hỏng vắc-xin.'
  },
  {
    question: 'Vắc-xin có thể bảo quản trong hộp kim loại không?',
    answer: 'Không, hộp kim loại không đảm bảo nhiệt độ ổn định, dễ làm hỏng vắc-xin.'
  },
  {
    question: 'Vắc-xin có thể bảo quản trong túi giữ nhiệt không?',
    answer: 'Có thể trong thời gian ngắn, nhưng cần có đá lạnh và đảm bảo nhiệt độ **2-8°C**, không quá 2 giờ.'
  },
  {
    question: 'Vắc-xin có bị ảnh hưởng bởi từ trường không?',
    answer:
      'Không, từ trường thông thường không ảnh hưởng đến vắc-xin, nhưng nên tránh các thiết bị phát từ trường mạnh.'
  },
  {
    question: 'Vắc-xin có thể bảo quản trong túi nhựa không?',
    answer: 'Không, túi nhựa không giữ được nhiệt độ và độ kín, dễ làm hỏng vắc-xin.'
  },

  // Nhóm 9: Câu hỏi về tiêm chủng và du lịch
  {
    question: 'Vắc-xin nào cần tiêm khi đi Thái Lan?',
    answer: '- **Viêm gan A**.\n- **Thương hàn**.\n- **Viêm não Nhật Bản** (nếu đi khu vực nguy cơ cao).'
  },
  {
    question: 'Vắc-xin nào cần tiêm khi đi Ấn Độ?',
    answer: '- **Viêm gan A**.\n- **Thương hàn**.\n- **Sốt vàng** (nếu đi qua khu vực có nguy cơ).'
  },
  {
    question: 'Vắc-xin nào cần tiêm khi đi Úc?',
    answer: '- **Cúm**.\n- **MMR** (nếu chưa tiêm đủ).\n- **Td** (nhắc lại nếu cần).'
  },
  {
    question: 'Vắc-xin nào cần tiêm khi đi Nhật Bản?',
    answer: '- **Viêm gan A**.\n- **Viêm não Nhật Bản**.\n- **Cúm** (đặc biệt vào mùa đông).'
  },
  {
    question: 'Vắc-xin nào cần tiêm khi đi Hàn Quốc?',
    answer: '- **Viêm gan A**.\n- **Cúm** (vào mùa đông).\n- **Td** (nhắc lại nếu cần).'
  },
  {
    question: 'Vắc-xin nào cần tiêm khi đi châu Âu?',
    answer: '- **Cúm**.\n- **MMR** (nếu chưa tiêm đủ).\n- **Td** (nhắc lại mỗi 10 năm).'
  },
  {
    question: 'Vắc-xin nào cần tiêm khi đi Trung Đông?',
    answer: '- **Viêm gan A**.\n- **Thương hàn**.\n- **Viêm màng não** (đặc biệt nếu đi hành hương).'
  },
  {
    question: 'Vắc-xin nào cần tiêm khi đi Nam Phi?',
    answer: '- **Sốt vàng**.\n- **Viêm gan A**.\n- **Thương hàn**.'
  },
  {
    question: 'Vắc-xin nào cần tiêm khi đi Brazil?',
    answer: '- **Sốt vàng**.\n- **Viêm gan A**.\n- **Thương hàn**.'
  },
  {
    question: 'Vắc-xin nào cần tiêm khi đi Canada?',
    answer: '- **Cúm** (vào mùa đông).\n- **MMR** (nếu chưa tiêm đủ).\n- **Td** (nhắc lại nếu cần).'
  },

  // Nhóm 10: Câu hỏi khác
  {
    question: 'Tiêm vắc-xin có ảnh hưởng đến kết quả xét nghiệm nước tiểu không?',
    answer: 'Không đáng kể, nhưng nên đợi 1-2 ngày sau tiêm để xét nghiệm nước tiểu cho chính xác.'
  },
  {
    question: 'Tiêm vắc-xin có ảnh hưởng đến kết quả chụp X-quang không?',
    answer: 'Không, tiêm vắc-xin không ảnh hưởng đến kết quả chụp X-quang.'
  },
  {
    question: 'Tiêm vắc-xin có ảnh hưởng đến kết quả nội soi không?',
    answer: 'Không, tiêm vắc-xin không ảnh hưởng đến kết quả nội soi.'
  },
  {
    question: 'Tiêm vắc-xin có ảnh hưởng đến kết quả siêu âm không?',
    answer: 'Không, tiêm vắc-xin không ảnh hưởng đến kết quả siêu âm.'
  },
  {
    question: 'Tiêm vắc-xin có ảnh hưởng đến kết quả xét nghiệm HIV không?',
    answer: 'Không, nhưng nên đợi 1-2 ngày sau tiêm để tránh nhiễu kết quả do phản ứng miễn dịch.'
  },
  {
    question: 'Tiêm vắc-xin có ảnh hưởng đến kết quả xét nghiệm chức năng gan không?',
    answer: 'Không đáng kể, nhưng nên đợi 1-2 ngày sau tiêm để kết quả chính xác hơn.'
  },
  {
    question: 'Tiêm vắc-xin có ảnh hưởng đến kết quả xét nghiệm chức năng thận không?',
    answer: 'Không đáng kể, nhưng nên đợi 1-2 ngày sau tiêm để kết quả chính xác hơn.'
  },
  {
    question: 'Tiêm vắc-xin có ảnh hưởng đến kết quả xét nghiệm mỡ máu không?',
    answer: 'Không, tiêm vắc-xin không ảnh hưởng đến kết quả xét nghiệm mỡ máu.'
  },
  {
    question: 'Tiêm vắc-xin có ảnh hưởng đến kết quả xét nghiệm đường huyết không?',
    answer: 'Không đáng kể, nhưng người tiểu đường nên theo dõi đường huyết sau tiêm để yên tâm.'
  },
  {
    question: 'Tiêm vắc-xin có ảnh hưởng đến kết quả xét nghiệm chức năng tuyến giáp không?',
    answer: 'Không, tiêm vắc-xin không ảnh hưởng đến kết quả xét nghiệm chức năng tuyến giáp.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh viêm khớp do vi khuẩn?',
    answer:
      'Hiện chưa có vắc-xin đặc hiệu phòng viêm khớp do vi khuẩn tại VAXBOT. Tuy nhiên, vắc-xin **phế cầu** có thể giảm nguy cơ từ vi khuẩn liên quan.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh viêm ruột do vi khuẩn E.coli?',
    answer:
      'Hiện chưa có vắc-xin đặc hiệu phòng viêm ruột do E.coli tại VAXBOT. Bạn nên duy trì vệ sinh thực phẩm để giảm nguy cơ.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh viêm màng tim do virus?',
    answer:
      'Hiện chưa có vắc-xin đặc hiệu phòng viêm màng tim do virus tại VAXBOT. Tuy nhiên, vắc-xin **cúm** có thể giảm nguy cơ biến chứng.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh viêm amidan do liên cầu khuẩn?',
    answer:
      'Hiện chưa có vắc-xin đặc hiệu phòng viêm amidan do liên cầu khuẩn tại VAXBOT. Vắc-xin **phế cầu** có thể giảm nguy cơ gián tiếp.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh viêm tuyến giáp Hashimoto?',
    answer:
      'Hiện chưa có vắc-xin phòng bệnh viêm tuyến giáp Hashimoto tại VAXBOT, vì đây là bệnh tự miễn, không do virus hay vi khuẩn.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh viêm phế quản mãn tính?',
    answer:
      'Hiện chưa có vắc-xin đặc hiệu phòng viêm phế quản mãn tính tại VAXBOT. Tuy nhiên, vắc-xin **cúm** và **phế cầu** có thể giảm nguy cơ biến chứng.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh viêm dạ dày do Helicobacter pylori?',
    answer:
      'Hiện chưa có vắc-xin đặc hiệu phòng viêm dạ dày do Helicobacter pylori tại VAXBOT. Bạn nên duy trì vệ sinh ăn uống để giảm nguy cơ.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh viêm tụy do virus?',
    answer:
      'Hiện chưa có vắc-xin đặc hiệu phòng viêm tụy do virus tại VAXBOT. Vắc-xin **MMR** có thể giảm nguy cơ từ virus quai bị.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh viêm thận do vi khuẩn?',
    answer:
      'Hiện chưa có vắc-xin đặc hiệu phòng viêm thận do vi khuẩn tại VAXBOT. Vắc-xin **phế cầu** có thể giảm nguy cơ gián tiếp.'
  },
  {
    question: 'Vắc-xin nào phòng bệnh viêm màng phổi do vi khuẩn?',
    answer:
      'Hiện chưa có vắc-xin đặc hiệu phòng viêm màng phổi do vi khuẩn tại VAXBOT. Vắc-xin **phế cầu** và **cúm** có thể giảm nguy cơ biến chứng.'
  },

  // Nhóm 2: Lịch tiêm chủng và độ tuổi
  {
    question: 'Trẻ 6 tháng tuổi tại VAXBOT cần tiêm vắc-xin gì?',
    answer:
      'Trẻ 6 tháng tuổi tại VAXBOT nên tiêm gói vắc-xin từ 0-6 tháng, gồm 9-12 mũi tiêm, phòng hơn 12 bệnh như viêm gan B, bạch hầu, ho gà, uốn ván, và phế cầu.'
  },
  {
    question: 'Trẻ 9 tháng tuổi tại VAXBOT cần tiêm vắc-xin gì?',
    answer:
      'Trẻ 9 tháng tuổi tại VAXBOT nên tiêm gói vắc-xin từ 0-9 tháng, gồm 14-17 mũi tiêm, phòng hơn 16 bệnh, bao gồm sởi, viêm não Nhật Bản, và phế cầu.'
  },
  {
    question: 'Trẻ 12 tháng tuổi tại VAXBOT cần tiêm vắc-xin gì?',
    answer:
      'Trẻ 12 tháng tuổi tại VAXBOT nên tiêm gói vắc-xin từ 0-12 tháng, gồm 19-23 mũi tiêm, phòng hơn 20 bệnh như sởi, quai bị, rubella, và thủy đậu.'
  },
  {
    question: 'Trẻ tiền học đường tại VAXBOT cần tiêm vắc-xin gì?',
    answer:
      'Trẻ tiền học đường tại VAXBOT nên tiêm gói vắc-xin gồm 10 loại, 14 liều cơ bản, phòng 19 bệnh như sởi, quai bị, rubella, và viêm não Nhật Bản.'
  },
  {
    question: 'Trẻ vị thành niên 9-18 tuổi tại VAXBOT cần tiêm vắc-xin gì?',
    answer:
      'Trẻ vị thành niên 9-18 tuổi tại VAXBOT nên tiêm gói vắc-xin gồm 15 mũi, phòng 17 bệnh, bao gồm HPV (Gardasil hoặc Gardasil 9), cúm, và Td.'
  },
  {
    question: 'Phụ nữ chuẩn bị mang thai tại VAXBOT cần tiêm vắc-xin gì?',
    answer:
      'Phụ nữ chuẩn bị mang thai tại VAXBOT nên tiêm gói vắc-xin gồm 11 mũi, phòng 17 bệnh như sởi, quai bị, rubella, thủy đậu, và uốn ván.'
  },
  {
    question: 'Người lớn trên 18 tuổi tại VAXBOT cần tiêm vắc-xin gì?',
    answer:
      'Người lớn trên 18 tuổi tại VAXBOT nên tiêm vắc-xin cúm hàng năm, Td (nhắc lại mỗi 10 năm), và các vắc-xin như viêm gan A, B, HPV nếu chưa tiêm.'
  },
  {
    question: 'Người cao tuổi trên 65 tuổi tại VAXBOT cần tiêm vắc-xin gì?',
    answer:
      'Người cao tuổi trên 65 tuổi tại VAXBOT nên tiêm vắc-xin Pneumovax 23 (phế cầu), Shingrix (zona), và cúm hàng năm để bảo vệ sức khỏe.'
  },
  {
    question: 'Trẻ 1-10 tuổi tại VAXBOT có được tiêm vắc-xin sởi miễn phí không?',
    answer:
      'Có, từ ngày 12/09/2024, 39 trung tâm VAXBOT tại TP.HCM triển khai tiêm vắc-xin sởi miễn phí cho trẻ 1-10 tuổi chưa tiêm đủ 2 mũi hoặc không rõ lịch sử tiêm chủng.'
  },
  {
    question: 'Người 50 tuổi tại VAXBOT có cần tiêm vắc-xin zona không?',
    answer:
      'Có, người 50 tuổi trở lên tại VAXBOT nên tiêm vắc-xin Shingrix để phòng bệnh zona thần kinh và các biến chứng như đau dây thần kinh sau zona.'
  },

  // Nhóm 3: Giá cả và ưu đãi tại VAXBOT
  {
    question: 'Giá vắc-xin sởi đa liều tại VAXBOT Lạc Long Quân là bao nhiêu trong tháng khai trương?',
    answer:
      'Trong tháng khai trương từ 06/09/2024 đến 06/10/2024, giá vắc-xin sởi đa liều tại VAXBOT Lạc Long Quân là 198.000 VND, áp dụng buổi sáng các ngày trong tuần, thứ 7 và chủ nhật cả ngày.'
  },
  {
    question: 'Ưu đãi khi mua gói vắc-xin thứ 2 tại VAXBOT Quảng Xương là gì?',
    answer:
      'Tại VAXBOT Quảng Xương, từ 04/10/2024 đến 04/11/2024, khách hàng mua gói vắc-xin thứ 2 trở đi được ưu đãi 1% giá trị gói.'
  },
  {
    question: 'Khách hàng tiêm lẻ dưới 1 triệu đồng tại VAXBOT Trung Kính nhận quà gì trong tháng khai trương?',
    answer:
      'Trong tháng khai trương từ 28/03/2024 đến 28/04/2024, khách hàng tiêm lẻ dưới 1 triệu đồng tại VAXBOT Trung Kính được tặng quạt nhựa VAXBOT.'
  },
  {
    question:
      'Khách hàng tiêm lẻ từ 2 triệu đồng trở lên tại VAXBOT Lạc Long Quân nhận quà gì trong tháng khai trương?',
    answer:
      'Trong tháng khai trương từ 06/09/2024 đến 06/10/2024, khách hàng tiêm lẻ từ 2 triệu đồng trở lên tại VAXBOT Lạc Long Quân được tặng thú bông rồng VAXBOT cỡ lớn, túi giữ nhiệt cỡ trung, hoặc túi hai quai.'
  },
  {
    question: 'Gói vắc-xin từ 3-5 triệu tại VAXBOT Quảng Xương có ưu đãi gì trong tháng khai trương?',
    answer:
      'Trong tháng khai trương từ 04/10/2024 đến 04/11/2024, khách hàng mua gói vắc-xin từ 3-5 triệu tại VAXBOT Quảng Xương nhận voucher 100.000 VND, thú bông rồng size to, hoặc gối kê cổ VAXBOT.'
  },
  {
    question: 'VAXBOT có miễn phí tiêm vắc-xin Lao cho trẻ không?',
    answer:
      'Có, trong tháng khai trương tại các trung tâm như VAXBOT Quảng Xương (04/10/2024 - 04/11/2024), VAXBOT miễn phí tiêm vắc-xin Lao cho trẻ trong khung giờ hoạt động.'
  },
  {
    question: 'VAXBOT có miễn phí tiêm vắc-xin uốn ván cho mẹ bầu không?',
    answer:
      'Có, trong tháng khai trương tại các trung tâm như VAXBOT Lạc Long Quân (06/09/2024 - 06/10/2024), VAXBOT miễn phí tiêm vắc-xin uốn ván cho mẹ bầu trong khung giờ hoạt động.'
  },
  {
    question: 'Khách hàng tiêm lẻ từ 1-2 triệu đồng tại VAXBOT Quảng Xương nhận quà gì trong tháng khai trương?',
    answer:
      'Trong tháng khai trương từ 04/10/2024 đến 04/11/2024, khách hàng tiêm lẻ từ 1-2 triệu đồng tại VAXBOT Quảng Xương được tặng túi giữ nhiệt nhỏ VAXBOT hoặc balo baby VAXBOT.'
  },
  {
    question: 'VAXBOT có hỗ trợ trả góp không lãi suất cho gói vắc-xin không?',
    answer:
      'Có, VAXBOT hỗ trợ trả góp không lãi suất trong 6 tháng cho gói vắc-xin, giúp khách hàng chia nhỏ chi phí và giảm áp lực tài chính.'
  },
  {
    question: 'VAXBOT có miễn phí khám trước tiêm không?',
    answer: 'Có, giá vắc-xin tại VAXBOT đã bao gồm phí khám trước tiêm miễn phí với đội ngũ bác sĩ chuyên môn cao.'
  },

  // Nhóm 4: Tác dụng phụ và chăm sóc sau tiêm
  {
    question: 'Tiêm vắc-xin tại VAXBOT có gây sốt nhẹ không?',
    answer:
      'Có thể, sốt nhẹ là phản ứng bình thường sau tiêm vắc-xin tại VAXBOT, thường tự khỏi sau 24-48 giờ, và khách hàng được theo dõi 30 phút sau tiêm.'
  },
  {
    question: 'Tiêm vắc-xin tại VAXBOT có gây sưng đỏ tại chỗ tiêm không?',
    answer:
      'Có thể, sưng đỏ tại chỗ tiêm là phản ứng nhẹ sau tiêm vắc-xin tại VAXBOT, thường biến mất sau 24-48 giờ, và khách hàng được hướng dẫn theo dõi tại nhà.'
  },
  {
    question: 'Sau tiêm vắc-xin tại VAXBOT có nên tắm ngay không?',
    answer: 'Có thể tắm, nhưng nên tránh chà xát mạnh vào vị trí tiêm để không gây kích ứng, theo hướng dẫn của VAXBOT.'
  },
  {
    question: 'Tiêm vắc-xin tại VAXBOT có gây mệt mỏi không?',
    answer:
      'Có thể, một số người có thể cảm thấy mệt mỏi nhẹ sau tiêm do phản ứng miễn dịch, thường tự khỏi sau 1-2 ngày, theo dõi theo hướng dẫn của VAXBOT.'
  },
  {
    question: 'Sau tiêm vắc-xin tại VAXBOT có nên uống sữa không?',
    answer:
      'Có, uống sữa không ảnh hưởng đến hiệu quả vắc-xin, nhưng nên tránh nếu cảm thấy khó chịu hoặc có tiền sử dị ứng sữa.'
  },
  {
    question: 'Tiêm vắc-xin tại VAXBOT có gây đau đầu không?',
    answer:
      'Hiếm gặp, nhưng một số người có thể bị đau đầu nhẹ do phản ứng miễn dịch, nên nghỉ ngơi và theo dõi theo hướng dẫn của VAXBOT.'
  },
  {
    question: 'Sau tiêm vắc-xin tại VAXBOT có nên ăn đồ chua không?',
    answer:
      'Có thể ăn, nhưng nên hạn chế nếu cảm thấy mệt mỏi hoặc có vấn đề về dạ dày sau tiêm, theo hướng dẫn của VAXBOT.'
  },
  {
    question: 'Tiêm vắc-xin tại VAXBOT có gây buồn nôn không?',
    answer:
      'Hiếm gặp, nhưng một số người nhạy cảm có thể bị buồn nôn nhẹ, nên nghỉ ngơi và liên hệ bác sĩ nếu triệu chứng kéo dài.'
  },
  {
    question: 'Sau tiêm vắc-xin tại VAXBOT có nên uống trà không?',
    answer:
      'Có thể uống, nhưng nên hạn chế nếu cảm thấy mệt mỏi, vì trà có thể gây kích ứng dạ dày trong trạng thái cơ thể đang phản ứng với vắc-xin.'
  },
  {
    question: 'Tiêm vắc-xin tại VAXBOT có gây ngứa tại chỗ tiêm không?',
    answer:
      'Có thể, ngứa tại chỗ tiêm là phản ứng nhẹ, thường tự khỏi sau vài ngày, nên tránh gãi và theo dõi theo hướng dẫn của VAXBOT.'
  },

  // Nhóm 5: Dịch vụ và quy trình tại VAXBOT
  {
    question: 'VAXBOT có hỗ trợ tiêm vắc-xin lưu động cho doanh nghiệp không?',
    answer:
      'Có, VAXBOT cung cấp dịch vụ tiêm chủng lưu động cho các nhóm khách hàng, cơ quan, doanh nghiệp theo yêu cầu.'
  },
  {
    question: 'VAXBOT có cấp chứng chỉ tiêm chủng cho người đi du học không?',
    answer:
      'Có, VAXBOT hỗ trợ cấp chứng chỉ tiêm chủng cho khách hàng đi du học hoặc du lịch, đảm bảo đáp ứng yêu cầu quốc tế.'
  },
  {
    question: 'VAXBOT có khu vui chơi cho trẻ em không?',
    answer:
      'Có, các trung tâm VAXBOT như VAXBOT Quảng Xương, Trung Kính đều có khu vui chơi rộng rãi, thoáng mát dành cho trẻ em.'
  },
  {
    question: 'VAXBOT có hỗ trợ đặt giữ vắc-xin online không?',
    answer: 'Có, khách hàng có thể đặt giữ vắc-xin online qua website VAXBOT.vn hoặc qua tổng đài 028.7102.6595.'
  },
  {
    question: 'VAXBOT có hệ thống bảo quản vắc-xin đạt chuẩn không?',
    answer:
      'Có, VAXBOT sở hữu hệ thống dây chuyền lạnh đạt chuẩn GSP, với khả năng bảo quản 400 triệu liều vắc-xin ở nhiệt độ 2-8°C.'
  },
  {
    question: 'VAXBOT có hỗ trợ thanh toán qua ví điện tử không?',
    answer:
      'Có, VAXBOT hỗ trợ thanh toán qua ví điện tử như VNPAY-QR, Momo, Apple Pay, và các ứng dụng thương mại điện tử.'
  },
  {
    question: 'VAXBOT có làm việc vào cuối tuần không?',
    answer:
      'Có, VAXBOT làm việc tất cả các ngày trong tuần, từ thứ 2 đến chủ nhật, bao gồm cả ngày lễ nếu không có thông báo nghỉ.'
  },
  {
    question: 'VAXBOT có hỗ trợ tra cứu lịch sử tiêm chủng không?',
    answer:
      'Có, khách hàng có thể tra cứu lịch sử tiêm chủng qua Mobile App VAXBOT, hotline 028.7102.6595, hoặc Hệ thống thông tin Tiêm chủng Quốc gia.'
  },
  {
    question: 'VAXBOT có bác sĩ chuyên môn cao không?',
    answer:
      'Có, 100% bác sĩ và điều dưỡng tại VAXBOT có chứng chỉ an toàn tiêm chủng của Bộ Y tế và được đào tạo kỹ năng xử trí phản ứng sau tiêm.'
  },
  {
    question: 'VAXBOT có hỗ trợ tiêm vắc-xin cho người có bệnh nền không?',
    answer:
      'Có, VAXBOT hỗ trợ tiêm vắc-xin cho người có bệnh nền, nhưng cần được bác sĩ thăm khám và tư vấn trước khi tiêm.'
  },

  // Nhóm 6: Tình huống đặc biệt
  {
    question: 'Người bị bệnh tim mạch có tiêm vắc-xin tại VAXBOT được không?',
    answer:
      'Có, nhưng cần được bác sĩ tại VAXBOT thăm khám và đánh giá tình trạng tim mạch trước khi tiêm để đảm bảo an toàn.'
  },
  {
    question: 'Người bị bệnh huyết áp cao có tiêm vắc-xin tại VAXBOT được không?',
    answer: 'Có, nhưng cần báo bác sĩ tại VAXBOT để kiểm tra huyết áp trước khi tiêm, đảm bảo tình trạng ổn định.'
  },
  {
    question: 'Người bị bệnh ung thư có tiêm vắc-xin tại VAXBOT được không?',
    answer:
      'Có, nhưng cần bác sĩ chuyên khoa ung bướu đánh giá và tư vấn tại VAXBOT, vì một số vắc-xin có thể không phù hợp.'
  },
  {
    question: 'Người bị bệnh tự miễn có tiêm vắc-xin tại VAXBOT được không?',
    answer:
      'Có, nhưng cần bác sĩ tại VAXBOT đánh giá, đặc biệt nếu đang dùng thuốc ức chế miễn dịch, để đảm bảo an toàn.'
  },
  {
    question: 'Người bị dị ứng nặng có tiêm vắc-xin tại VAXBOT được không?',
    answer: 'Có, nhưng cần báo bác sĩ tại VAXBOT về tiền sử dị ứng để được khám sàng lọc kỹ lưỡng và theo dõi sau tiêm.'
  },
  {
    question: 'Phụ nữ mang thai có tiêm vắc-xin tại VAXBOT được không?',
    answer:
      'Có, phụ nữ mang thai có thể tiêm một số vắc-xin như uốn ván, cúm tại VAXBOT, nhưng cần bác sĩ tư vấn trước.'
  },
  {
    question: 'Người vừa phẫu thuật có tiêm vắc-xin tại VAXBOT được không?',
    answer: 'Cần hoãn tiêm nếu vừa phẫu thuật, nên đợi ít nhất 1 tháng và tham khảo ý kiến bác sĩ tại VAXBOT.'
  },
  {
    question: 'Người bị sốt cao có tiêm vắc-xin tại VAXBOT được không?',
    answer: 'Không, người bị sốt cao cần hoãn tiêm, nên đến VAXBOT khi sức khỏe ổn định để được bác sĩ đánh giá.'
  },
  {
    question: 'Người bị nhiễm HPV có tiêm vắc-xin HPV tại VAXBOT được không?',
    answer:
      'Có, người bị nhiễm HPV vẫn có thể tiêm vắc-xin HPV tại VAXBOT để bảo vệ khỏi các chủng HPV khác, nhưng cần bác sĩ tư vấn.'
  },
  {
    question: 'Người bị sùi mào gà có tiêm vắc-xin tại VAXBOT được không?',
    answer:
      'Có, nhưng cần báo bác sĩ tại VAXBOT để được tư vấn, vì sùi mào gà do HPV gây ra và có thể cần tiêm vắc-xin HPV.'
  },

  // Nhóm 7: Sức khỏe cộng đồng và tiêm chủng
  {
    question: 'Tiêm vắc-xin tại VAXBOT có giúp giảm nguy cơ bệnh viêm màng não không?',
    answer: 'Có, vắc-xin Bexsero và Pneumovax 23 tại VAXBOT giúp giảm nguy cơ viêm màng não do não mô cầu và phế cầu.'
  },
  {
    question: 'Tiêm vắc-xin tại VAXBOT có giúp giảm nguy cơ bệnh nhiễm khuẩn huyết không?',
    answer:
      'Có, vắc-xin Bexsero và Pneumovax 23 tại VAXBOT giúp giảm nguy cơ nhiễm khuẩn huyết do não mô cầu và phế cầu.'
  },
  {
    question: 'Tiêm vắc-xin tại VAXBOT có giúp giảm nguy cơ bệnh viêm phổi không?',
    answer: 'Có, vắc-xin Pneumovax 23 và cúm tại VAXBOT giúp giảm nguy cơ viêm phổi do phế cầu và virus cúm.'
  },
  {
    question: 'Tiêm vắc-xin tại VAXBOT có giúp giảm nguy cơ bệnh ung thư hầu họng không?',
    answer: 'Có, vắc-xin Gardasil và Gardasil 9 tại VAXBOT giúp giảm nguy cơ ung thư hầu họng do virus HPV.'
  },
  {
    question: 'Tiêm vắc-xin tại VAXBOT có giúp giảm nguy cơ bệnh bạch hầu không?',
    answer: 'Có, vắc-xin 6 trong 1, 5 trong 1, và Td tại VAXBOT giúp phòng bệnh bạch hầu hiệu quả.'
  },
  {
    question: 'Tiêm vắc-xin tại VAXBOT có giúp giảm nguy cơ bệnh rubella không?',
    answer: 'Có, vắc-xin MMR tại VAXBOT giúp phòng bệnh rubella, bảo vệ trẻ em và phụ nữ chuẩn bị mang thai.'
  },
  {
    question: 'Tiêm vắc-xin tại VAXBOT có giúp giảm nguy cơ bệnh quai bị không?',
    answer: 'Có, vắc-xin MMR tại VAXBOT giúp phòng bệnh quai bị, giảm nguy cơ biến chứng ở trẻ em và người lớn.'
  },
  {
    question: 'Tiêm vắc-xin tại VAXBOT có giúp giảm nguy cơ bệnh sốt phát ban không?',
    answer: 'Có, vắc-xin MMR tại VAXBOT giúp giảm nguy cơ sốt phát ban do rubella, đặc biệt trong thời điểm giao mùa.'
  },
  {
    question: 'Tiêm vắc-xin tại VAXBOT có giúp giảm nguy cơ bệnh viêm đường hô hấp không?',
    answer: 'Có, vắc-xin cúm và Pneumovax 23 tại VAXBOT giúp giảm nguy cơ viêm đường hô hấp do virus cúm và phế cầu.'
  },
  {
    question: 'Tiêm vắc-xin tại VAXBOT có giúp giảm nguy cơ bệnh tay chân miệng không?',
    answer:
      'VAXBOT đang hợp tác để đưa về vắc-xin phòng tay chân miệng do Enterovirus 71, giúp giảm nguy cơ bệnh này trong tương lai.'
  },

  // Nhóm 8: Bảo quản và vận chuyển vắc-xin tại VAXBOT
  {
    question: 'VAXBOT bảo quản vắc-xin ở nhiệt độ bao nhiêu?',
    answer: 'VAXBOT bảo quản vắc-xin ở nhiệt độ tiêu chuẩn 2-8°C, đảm bảo chất lượng theo yêu cầu của nhà sản xuất.'
  },
  {
    question: 'VAXBOT có hệ thống giám sát nhiệt độ bảo quản vắc-xin không?',
    answer: 'Có, VAXBOT trang bị hệ thống giám sát nhiệt độ tự động 24/24, phát cảnh báo qua GSM nếu có sự cố.'
  },
  {
    question: 'VAXBOT có xe lạnh chuyên dụng để vận chuyển vắc-xin không?',
    answer:
      'Có, VAXBOT sử dụng xe lạnh chuyên dụng đạt chuẩn GSP để vận chuyển vắc-xin, đảm bảo chất lượng trong suốt hành trình.'
  },
  {
    question: 'VAXBOT có kho lạnh âm sâu không?',
    answer: 'Có, VAXBOT có 3 kho lạnh âm sâu trên toàn quốc, cùng 4 kho lạnh tổng ở TP.HCM, Đà Nẵng, và Hà Nội.'
  },
  {
    question: 'VAXBOT có khả năng bảo quản bao nhiêu liều vắc-xin cùng lúc?',
    answer: 'VAXBOT có khả năng bảo quản 400 triệu liều vắc-xin cùng lúc, đảm bảo nhiệt độ 2-8°C.'
  },
  {
    question: 'VAXBOT có hệ thống dự phòng khi mất điện không?',
    answer: 'Có, VAXBOT trang bị thiết bị ba nguồn điện tại mỗi kho lạnh với cơ chế kích hoạt khẩn cấp khi mất điện.'
  },
  {
    question: 'VAXBOT có cảnh báo khi nhiệt độ bảo quản vắc-xin bất thường không?',
    answer: 'Có, VAXBOT có hệ thống cảnh báo qua SMS và email khi nhiệt độ bảo quản vắc-xin bất thường.'
  },
  {
    question: 'VAXBOT có tủ bảo quản vắc-xin tại phòng tiêm không?',
    answer: 'Có, 100% phòng tiêm tại VAXBOT được trang bị tủ bảo quản vắc-xin chuyên dụng, đảm bảo nhiệt độ 2-8°C.'
  },
  {
    question: 'VAXBOT có kiểm soát chất lượng vắc-xin từ khâu vận chuyển không?',
    answer: 'Có, VAXBOT kiểm soát chặt chẽ chất lượng vắc-xin từ khâu vận chuyển đến khi tiêm, đảm bảo đạt chuẩn GSP.'
  },
  {
    question: 'VAXBOT có hệ thống dây chuyền lạnh tại chỗ không?',
    answer: 'Có, tất cả trung tâm VAXBOT đều có hệ thống dây chuyền lạnh tại chỗ, đảm bảo bảo quản vắc-xin an toàn.'
  },

  // Nhóm 9: Tiêm chủng và du lịch tại VAXBOT
  {
    question: 'Vắc-xin nào cần tiêm tại VAXBOT khi đi Nhật Bản?',
    answer:
      'Khi đi Nhật Bản, bạn nên tiêm vắc-xin viêm gan A, viêm não Nhật Bản, và cúm tại VAXBOT, đặc biệt vào mùa đông.'
  },
  {
    question: 'Vắc-xin nào cần tiêm tại VAXBOT khi đi Hàn Quốc?',
    answer: 'Khi đi Hàn Quốc, bạn nên tiêm vắc-xin viêm gan A, cúm, và Td (uốn ván - bạch hầu) tại VAXBOT.'
  },
  {
    question: 'Vắc-xin nào cần tiêm tại VAXBOT khi đi Úc?',
    answer: 'Khi đi Úc, bạn nên tiêm vắc-xin viêm gan A, viêm gan B, và cúm tại VAXBOT, đặc biệt nếu đi vào mùa lạnh.'
  },
  {
    question: 'Vắc-xin nào cần tiêm tại VAXBOT khi đi Mỹ?',
    answer: 'Khi đi Mỹ, bạn nên tiêm vắc-xin viêm gan A, viêm gan B, cúm, và MMR (nếu chưa tiêm đủ) tại VAXBOT.'
  },
  {
    question: 'Vắc-xin nào cần tiêm tại VAXBOT khi đi Canada?',
    answer:
      'Khi đi Canada, bạn nên tiêm vắc-xin viêm gan A, cúm, và Td (uốn ván - bạch hầu) tại VAXBOT, đặc biệt vào mùa đông.'
  },
  {
    question: 'Vắc-xin nào cần tiêm tại VAXBOT khi đi Pháp?',
    answer: 'Khi đi Pháp, bạn nên tiêm vắc-xin viêm gan A, cúm, và MMR (nếu chưa tiêm đủ) tại VAXBOT.'
  },
  {
    question: 'Vắc-xin nào cần tiêm tại VAXBOT khi đi Đức?',
    answer: 'Khi đi Đức, bạn nên tiêm vắc-xin viêm gan A, cúm, và Td (uốn ván - bạch hầu) tại VAXBOT.'
  },
  {
    question: 'Vắc-xin nào cần tiêm tại VAXBOT khi đi Ý?',
    answer: 'Khi đi Ý, bạn nên tiêm vắc-xin viêm gan A, viêm gan B, và cúm tại VAXBOT.'
  },
  {
    question: 'Vắc-xin nào cần tiêm tại VAXBOT khi đi Anh?',
    answer: 'Khi đi Anh, bạn nên tiêm vắc-xin viêm gan A, cúm, và MMR (nếu chưa tiêm đủ) tại VAXBOT.'
  },
  {
    question: 'Vắc-xin nào cần tiêm tại VAXBOT khi đi Thụy Sĩ?',
    answer: 'Khi đi Thụy Sĩ, bạn nên tiêm vắc-xin viêm gan A, cúm, và Td (uốn ván - bạch hầu) tại VAXBOT.'
  },

  // Nhóm 10: Tiêm chủng và sức khỏe tâm lý
  {
    question: 'Người bị rối loạn lo âu xã hội có tiêm vắc-xin tại VAXBOT được không?',
    answer: 'Được, nhưng nên báo bác sĩ tại VAXBOT nếu có lo lắng nghiêm trọng để được hỗ trợ tâm lý trước khi tiêm.'
  },
  {
    question: 'Người bị rối loạn ám ảnh sợ tiêm có tiêm vắc-xin tại VAXBOT được không?',
    answer:
      'Được, VAXBOT có đội ngũ nhân viên y tế chuyên nghiệp, có thể hỗ trợ tâm lý và tạo không gian thoải mái cho người sợ tiêm.'
  },
  {
    question: 'Người bị rối loạn tâm thần nhẹ có tiêm vắc-xin tại VAXBOT được không?',
    answer: 'Được, nhưng cần báo bác sĩ tại VAXBOT để được đánh giá và theo dõi kỹ sau tiêm.'
  },
  {
    question: 'Người bị rối loạn cảm xúc theo mùa có tiêm vắc-xin tại VAXBOT được không?',
    answer:
      'Được, rối loạn cảm xúc theo mùa không ảnh hưởng đến việc tiêm vắc-xin tại VAXBOT, nhưng nên báo bác sĩ nếu có triệu chứng nghiêm trọng.'
  },
  {
    question: 'Người bị rối loạn căng thẳng mãn tính có tiêm vắc-xin tại VAXBOT được không?',
    answer: 'Được, nhưng cần báo bác sĩ tại VAXBOT để được tư vấn và theo dõi sau tiêm, đặc biệt nếu đang dùng thuốc.'
  },
  {
    question: 'Người bị rối loạn giấc ngủ mãn tính có tiêm vắc-xin tại VAXBOT được không?',
    answer:
      'Được, rối loạn giấc ngủ mãn tính không ảnh hưởng đến việc tiêm vắc-xin tại VAXBOT, nhưng nên nghỉ ngơi đầy đủ sau tiêm.'
  },
  {
    question: 'Người bị bệnh vảy phấn hồng có tiêm vắc-xin tại VAXBOT được không?',
    answer:
      'Được, nhưng cần báo bác sĩ tại VAXBOT về tình trạng vảy phấn hồng để được đánh giá, đặc biệt nếu đang có tổn thương da nặng.'
  },
  {
    question: 'Người bị thoát vị đĩa đệm có tiêm vắc-xin tại VAXBOT được không?',
    answer:
      'Được, thoát vị đĩa đệm không ảnh hưởng đến việc tiêm vắc-xin tại VAXBOT, nhưng nên nghỉ ngơi sau tiêm để tránh căng thẳng cơ thể.'
  },
  {
    question: 'Người bị rối loạn tiền đình có tiêm vắc-xin tại VAXBOT được không?',
    answer:
      'Được, nhưng cần thông báo cho bác sĩ tại VAXBOT nếu đang có triệu chứng chóng mặt hoặc mất thăng bằng để được theo dõi kỹ.'
  },
  {
    question: 'Người bị viêm họng mãn tính có tiêm vắc-xin tại VAXBOT được không?',
    answer:
      'Được, viêm họng mãn tính không phải chống chỉ định, nhưng nên báo bác sĩ tại VAXBOT nếu đang có đợt viêm cấp tính.'
  },
  {
    question: 'Người bị bệnh mạch vành có tiêm vắc-xin tại VAXBOT được không?',
    answer: 'Được, nhưng cần bác sĩ tại VAXBOT đánh giá tình trạng tim mạch trước khi tiêm để đảm bảo an toàn.'
  },
  {
    question: 'Người bị viêm khớp mãn tính có tiêm vắc-xin tại VAXBOT được không?',
    answer: 'Được, nhưng cần báo bác sĩ tại VAXBOT nếu đang dùng thuốc giảm đau hoặc ức chế miễn dịch để được tư vấn.'
  },
  {
    question: 'Người bị thoái hóa khớp có tiêm vắc-xin tại VAXBOT được không?',
    answer:
      'Được, thoái hóa khớp không ảnh hưởng đến việc tiêm vắc-xin tại VAXBOT, nhưng nên tránh vận động mạnh sau tiêm.'
  },
  {
    question: 'Người bị bệnh lý tuyến giáp lành tính có tiêm vắc-xin tại VAXBOT được không?',
    answer:
      'Được, bệnh lý tuyến giáp lành tính không phải chống chỉ định, nhưng nên báo bác sĩ tại VAXBOT nếu đang dùng thuốc điều trị.'
  },
  {
    question: 'Người bị viêm da cơ địa có tiêm vắc-xin tại VAXBOT được không?',
    answer:
      'Được, nhưng cần thông báo cho bác sĩ tại VAXBOT nếu da đang có tổn thương hoặc nhiễm trùng để hoãn tiêm nếu cần.'
  }
]

export const history = trainingData
  .map((item) => [
    { role: 'user', parts: [{ text: item.question }] },
    { role: 'model', parts: [{ text: item.answer }] }
  ])
  .flat()

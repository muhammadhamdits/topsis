$(document).ready(function(){
    $("#CAList").hide();
    $("#getStarted").click();

    $("#formSetUp").on('submit', function(e){
        e.preventDefault();

        let nc = $("#jumlahKriteria").val();
        let na = $("#jumlahAlternatif").val();

        $("#modalSetUp").modal('hide');
        $("#getStarted").remove();

        let criteriaTable = $("#criteriaList tbody");
        for(let i = 1; i <= nc; i++){
            let tr = 
            "<tr>"+
                "<th width='10%'>"+
                    "C"+i+
                "</th>"+
                "<td width='60%'>"+
                    "<input type='text' name='kriteria"+i+"' id='kriteria"+i+"' class='form-control' placeholder='Nama Kriteria "+i+"'>"+
                "</td>"+
                "<td width='20%'>"+
                    "<input type='text' name='bobot"+i+"' id='bobot"+i+"' class='form-control' placeholder='Bobot'>"+
                "</td>"+
                "<td width='10%'>"+
                    "<button class='btn btn-pink'>Lihat</button>"+
                "</td>"+
            "</tr>";

            criteriaTable.append(tr);
        }
        $("#CAList").show();
    });
});
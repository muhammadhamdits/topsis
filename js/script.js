var criteria = [];
var nc, na;

$(document).ready(function(){
    $("#CAList").hide();
    $("#getStarted").click();

    $("#formSetUp").on('submit', function(e){
        e.preventDefault();

        nc = $("#jumlahKriteria").val();
        na = $("#jumlahAlternatif").val();

        $("#modalSetUp").modal('hide');
        $("#getStarted").remove();

        let criteriaTable = $("#criteriaList tbody");
        for(let i = 1; i <= nc; i++){
            criteria[i] = [null, []];
            let tr = 
            "<tr>"+
                "<th width='9%'>"+
                    "C"+i+
                "</th>"+
                "<td width='80%'>"+
                    "<input type='text' name='kriteria"+i+"' id='kriteria"+i+"' class='form-control kriteria' placeholder='Nama Kriteria "+i+"' oninput='kriteria(this)' data-id='"+i+"'>"+
                "</td>"+
                "<td width='9%'>"+
                    "<button class='btn btn-pink detailCriteria' data-id='"+i+"' onclick='detailCriteria(this)'  data-toggle='modal' data-target='#modalCriteria'>Detail</button>"+
                "</td>"+
                "<td width='2%'>"+
                    "<span class='text-danger' id='status"+i+"'>x</span>"
                "</td>"+
            "</tr>";

            criteriaTable.append(tr);
        }
        $("#CAList").show();
    });

    $("#formCriteria").on("submit", function(e){
        e.preventDefault();
        let id = $(this).data('id');
        let nci = $("#nCi").val();
        
        criteria[id][0] = $("#bobot").val();
        let category = criteria[id][1];
        for(let i = 0; i < nci; i++){
            category[i] = [$("#bobotKategori"+i).val(), $("#kategori"+i).val()];
        }

        $("#bobot").val('');
        $("#nCi").val('');
        $("#modalCriteria").modal('hide');

        checkValidation(criteria, id);
    });

    $("#nCi").on("input", function(e){
        let n = $(e.target).val();
        let criteriaCategoryList = $("#criteriaCategoryList tbody");
        
        criteriaCategoryList.html('');
        for(let i = 0; i < n; i++){
            let tr =
            "<tr>"+
                "<td width='40%'>"+
                    "<input type='text' name='kategori"+i+"' class='form-control kategori' data-id='"+i+"' placeholder='Kategori "+(i+1)+"' required id='kategori"+i+"'>"+
                "</td>"+
                "<td width='20%'>"+
                    "<input type='number' name='bobotKategori"+i+"' class='form-control bobotKategori' data-id='"+i+"' placeholder='Bobot' required id='bobotKategori"+i+"'>"+
                "</td>"+
            "</tr>";

            criteriaCategoryList.append(tr);
        }
    });
});

function kriteria(e){
    let id = $(e).data('id');
    checkValidation(criteria, id);
}

function detailCriteria(e) {
    let id = $(e).data('id');
    $("#formCriteria").data('id', id);

    if(criteria[id][0] != null){
        $("#bobot").val(criteria[id][0]);
        $("#nCi").val(criteria[id][1].length);
        $("#nCi").trigger("input");

        for(let i = 0; i < $("#nCi").val(); i++){
            $("#bobotKategori"+i).val(criteria[id][1][i][0]);
            $("#kategori"+i).val(criteria[id][1][i][1]);
        }
    }else{
        $("#bobot").val('');
        $("#nCi").val('');
        $("#criteriaCategoryList tbody").html('');
    }
}

function checkValidation(array, id){
    if(array[id][0] != null && $("#kriteria"+id).val() != ''){
        $("#status"+id).html('v');
        $("#status"+id).attr('class', 'text-success');
    }else{
        $("#status"+id).html('x');
        $("#status"+id).attr('class', 'text-danger');
    }
}
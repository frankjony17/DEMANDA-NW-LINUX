
if(!CULINARIA.Repository.Matricula){CULINARIA.Repository.Matricula={};}

CULINARIA.Repository.Matricula.loadReporte1=function(semestre, year, path){
    var query = "";
    query += "SELECT curso.id, curso_tipo.nombre AS curso,";
    query += "(SELECT count(matricula.curso_id) FROM matricula WHERE curso_id = curso.id) AS total_matricula,";
    query += "(SELECT count(matricula.curso_id) FROM matricula INNER JOIN persona ON persona.id = matricula.persona_id INNER JOIN organismo ON organismo.id = persona.organismo_id WHERE curso_id = curso.id AND organismo.nombre = 'MINCIN') AS MINCIN,";
    query += "(SELECT count(matricula.curso_id) FROM matricula INNER JOIN persona ON persona.id = matricula.persona_id INNER JOIN organismo ON organismo.id = persona.organismo_id WHERE curso_id = curso.id AND organismo.nombre = 'MINTUR') AS MINTUR,";
    query += "(SELECT count(matricula.curso_id) FROM matricula INNER JOIN persona ON persona.id = matricula.persona_id INNER JOIN organismo ON organismo.id = persona.organismo_id WHERE curso_id = curso.id AND organismo.nombre = 'MINED') AS MINED,";
    query += "(SELECT count(matricula.curso_id) FROM matricula INNER JOIN persona ON persona.id = matricula.persona_id INNER JOIN organismo ON organismo.id = persona.organismo_id WHERE curso_id = curso.id AND organismo.nombre = 'MININT') AS MININT,";
    query += "(SELECT count(matricula.curso_id) FROM matricula INNER JOIN persona ON persona.id = matricula.persona_id INNER JOIN organismo ON organismo.id = persona.organismo_id WHERE curso_id = curso.id AND organismo.nombre = 'MINFAR') AS MINFAR,";
    query += "(SELECT count(matricula.curso_id) FROM matricula INNER JOIN persona ON persona.id = matricula.persona_id INNER JOIN organismo ON organismo.id = persona.organismo_id WHERE curso_id = curso.id AND organismo.nombre = 'MINSAP') AS MINSAP,";
    query += "(SELECT count(matricula.curso_id) FROM matricula INNER JOIN persona ON persona.id = matricula.persona_id INNER JOIN organismo ON organismo.id = persona.organismo_id WHERE curso_id = curso.id AND organismo.nombre = 'MICONS') AS MICONS,";
    query += "(SELECT count(matricula.curso_id) FROM matricula INNER JOIN persona ON persona.id = matricula.persona_id INNER JOIN organismo ON organismo.id = persona.organismo_id WHERE curso_id = curso.id AND organismo.nombre = 'MINCUL') AS MINCUL,";
    query += "(SELECT count(matricula.curso_id) FROM matricula INNER JOIN persona ON persona.id = matricula.persona_id INNER JOIN organismo ON organismo.id = persona.organismo_id WHERE curso_id = curso.id AND organismo.nombre = 'OTROS') AS OTROS,";
    query += "(SELECT sum(costo.costo) FROM costo WHERE curso.costo_id = costo.id) AS total_costo,";
    query += "(SELECT count(matricula.curso_id) FROM matricula WHERE curso_id = curso.id AND matricula.evaluacion > 2) AS total_graduados ";
    query += "FROM curso ";
    query += "INNER JOIN curso_tipo ON curso_tipo.id = curso.curso_tipo_id ";
    query += "INNER JOIN semestre ON semestre.id = curso.semestre_id ";
    query += "WHERE semestre.nombre = '"+ semestre +"' AND date(curso.fecha_inicial) >= date('"+ (year - 1) +"-09-01');";

    CULINARIA.Sequelize.query(query, {
        type: CULINARIA.Sequelize.QueryTypes.SELECT
    }).then(function(record){
        if (record.length > 0) {
            /* Code HTML */
            var tr = '',
                html = CULINARIA.writeHtml(path, 'string'),
                tot1 = 0, tot3 = 0, tot4 = 0, tot5 = 0, tot6 = 0, tot7 = 0, tot8 = 0, tot9 = 0, tot10 = 0, tot11 = 0, totIn = 0, totGrad = 0;

            record.forEach(function (rec) {
                tr += "<tr style='height:12.0pt'>";
                tr += "<td width=200 style='width:70.9pt;border:solid navy 1.0pt;border-top:none;padding:0cm 3.5pt 0cm 3.5pt;height:12.0pt'><p align=center style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:center;line-height:normal'><span style='font-size:9.0pt;font-family:\"Arial\",sans-serif;color:#333399'>"+ rec.curso +"</span></p></td>";
                tr += "<td width=85 style='width:49.6pt;border-top:none;border-left:none;border-bottom:solid navy 1.0pt;border-right:solid navy 1.0pt;padding:0cm 3.5pt 0cm 3.5pt;height:12.0pt'><p align=center style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:center;line-height:normal'><span style='font-size:9.0pt;font-family:\"Arial\",sans-serif;color:#333399'>"+ rec.total_matricula +"</span></p></td>";
                tr += "<td width=85 style='width:63.8pt;border-top:none;border-left:none;border-bottom:solid navy 1.0pt;border-right:solid navy 1.0pt;padding:0cm 3.5pt 0cm 3.5pt;height:12.0pt'><p align=center style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:center;line-height:normal'><span style='font-size:9.0pt;font-family:\"Arial\",sans-serif;color:#333399'>"+ rec.total_matricula +"</span></p></td>";
                tr += "<td width=85 style='width:49.6pt;border-top:none;border-left:none;border-bottom:solid navy 1.0pt;border-right:solid navy 1.0pt;padding:0cm 3.5pt 0cm 3.5pt;height:12.0pt'><p align=center style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:center;line-height:normal'><span style='font-size:9.0pt;font-family:\"Arial\",sans-serif;color:#333399'>"+ rec.MINCIN +"</span></p></td>";
                tr += "<td width=85 style='width:49.65pt;border-top:none;border-left:none;border-bottom:solid navy 1.0pt;border-right:solid navy 1.0pt;padding:0cm 3.5pt 0cm 3.5pt;height:12.0pt'><p align=center style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:center;line-height:normal'><span style='font-size:9.0pt;font-family:\"Arial\",sans-serif;color:#333399'>"+ rec.MINTUR +"</span></p></td>";
                tr += "<td width=85 style='width:42.5pt;border-top:none;border-left:none;border-bottom:solid navy 1.0pt;border-right:solid navy 1.0pt;padding:0cm 3.5pt 0cm 3.5pt;height:12.0pt'><p align=center style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:center;line-height:normal'><span style='font-size:9.0pt;font-family:\"Arial\",sans-serif;color:#333399'>"+ rec.MINED +"</span></p></td>";
                tr += "<td width=85 style='width:42.55pt;border-top:none;border-left:none;border-bottom:solid navy 1.0pt;border-right:solid navy 1.0pt;padding:0cm 3.5pt 0cm 3.5pt;height:12.0pt'><p align=center style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:center;line-height:normal'><span style='font-size:9.0pt;font-family:\"Arial\",sans-serif;color:#333399'>"+ rec.MININT +"</span></p></td>";
                tr += "<td width=85 style='width:49.6pt;border-top:none;border-left:none;border-bottom:solid navy 1.0pt;border-right:solid navy 1.0pt;padding:0cm 3.5pt 0cm 3.5pt;height:12.0pt'><p align=center style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:center;line-height:normal'><span style='font-size:9.0pt;font-family:\"Arial\",sans-serif;color:#333399'>"+ rec.MINFAR +"</span></p></td>";
                tr += "<td width=85 style='width:49.6pt;border-top:none;border-left:none;border-bottom:solid navy 1.0pt;border-right:solid navy 1.0pt;padding:0cm 3.5pt 0cm 3.5pt;height:12.0pt'><p align=center style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:center;line-height:normal'><span style='font-size:9.0pt;font-family:\"Arial\",sans-serif;color:#333399'>"+ rec.MINSAP +"</span></p></td>";
                tr += "<td width=85 style='width:49.6pt;border-top:none;border-left:none;border-bottom:solid navy 1.0pt;border-right:solid navy 1.0pt;padding:0cm 3.5pt 0cm 3.5pt;height:12.0pt'><p align=center style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:center;line-height:normal'><span style='font-size:9.0pt;font-family:\"Arial\",sans-serif;color:#333399'>"+ rec.MICONS +"</span></p></td>";
                tr += "<td width=85 style='width:49.65pt;border-top:none;border-left:none;border-bottom:solid navy 1.0pt;border-right:solid navy 1.0pt;padding:0cm 3.5pt 0cm 3.5pt;height:12.0pt'><p align=center style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:center;line-height:normal'><span style='font-size:9.0pt;font-family:\"Arial\",sans-serif;color:#333399'>"+ rec.MINCUL +"</span></p></td>";
                tr += "<td width=85 style='width:49.6pt;border-top:none;border-left:none;border-bottom:solid navy 1.0pt;border-right:solid navy 1.0pt;padding:0cm 3.5pt 0cm 3.5pt;height:12.0pt'><p align=center style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:center;line-height:normal'><span style='font-size:9.0pt;font-family:\"Arial\",sans-serif;color:#333399'>"+ rec.OTROS +"</span></p></td>";
                tr += "<td width=120 style='width:49.6pt;border-top:none;border-left:none;border-bottom:solid navy 1.0pt;border-right:solid navy 1.0pt;padding:0cm 3.5pt 0cm 3.5pt;height:12.0pt'><p align=center style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:center;line-height:normal'><span style='font-size:9.0pt;font-family:\"Arial\",sans-serif;color:#333399'>"+ rec.total_costo +"</span></p></td>";
                tr += "<td width=120 style='width:70.9pt;border-top:none;border-left:none;border-bottom:solid navy 1.0pt;border-right:solid navy 1.0pt;padding:0cm 3.5pt 0cm 3.5pt;height:12.0pt'><p align=center style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:center;line-height:normal'><span style='font-size:9.0pt;font-family:\"Arial\",sans-serif;color:#333399'>"+ rec.total_graduados +"</span></p></td>";
                tr += "</tr>";
                totGrad += rec.total_graduados;totIn += rec.total_costo;tot1 += rec.total_matricula;tot3 += rec.MINCIN;tot4 += rec.MINTUR;tot5 += rec.MINED;tot6 += rec.MININT;tot7 += rec.MINFAR;tot8 += rec.MINSAP;tot9 += rec.MICONS;tot10 += rec.MINCUL;tot10 += rec.OTROS;
            });
            html = html.replace('{{semestre}}', semestre);
            html = html.replace('{{year}}', year);
            html = html.replace('{{tot1}}', tot1);
            html = html.replace('{{tot2}}', tot1);
            html = html.replace('{{tot3}}', tot3);
            html = html.replace('{{tot4}}', tot4);
            html = html.replace('{{tot5}}', tot5);
            html = html.replace('{{tot6}}', tot6);
            html = html.replace('{{tot7}}', tot7);
            html = html.replace('{{tot8}}', tot8);
            html = html.replace('{{tot9}}', tot9);
            html = html.replace('{{tot10}}', tot10);
            html = html.replace('{{tot11}}', tot11);
            html = html.replace('{{totIn}}', totIn);
            html = html.replace('{{totGrad}}', totGrad);
            html = html.replace('{{TR}}', tr);
            /* Write HTML file */
            CULINARIA.Lib.Fs.writeFile(CULINARIA.Data.Path+'/reports/ReporteMatricula.html', html);
            CULINARIA.pdf({
                orientation: "Landscape",
                pageSize: "Letter",
                title: "ReporteMatricula"
            });
        } else {
            CULINARIA.View.Msg.question('Atención', 'No Hay datos que mostrar.');
        }
    });
};

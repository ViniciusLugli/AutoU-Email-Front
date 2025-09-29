import { useState, useEffect } from 'react';
import { textService } from '../services';
import { FileText, Upload, Send } from 'lucide-react';
import Loading from '../components/Loading.jsx';
import EmailResultCard from '../components/EmailResultCard.jsx';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [texts, setTexts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    text: "",
    file: null,
  });

  const fetchTexts = async () => {
    try {
      const data = await textService.getTexts();
      setTexts(data);
    } catch {
      toast.error("Erro ao carregar histórico");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTexts();
  }, []);

  const handleTextChange = (e) => {
    setFormData({
      ...formData,
      text: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Verificar se é PDF ou TXT
      const allowedTypes = ["application/pdf", "text/plain"];
      if (allowedTypes.includes(file.type)) {
        setFormData({
          ...formData,
          file: file,
          text: "", // Limpar texto se arquivo foi selecionado
        });
      } else {
        toast.error("Apenas arquivos PDF e TXT são permitidos");
        e.target.value = "";
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.text.trim() && !formData.file) {
      toast.error("Por favor, insira um texto ou selecione um arquivo");
      return;
    }

    setProcessing(true);

    try {
      await textService.processEmail(formData);
      toast.success("Email enviado para processamento!");

      // Limpar formulário
      setFormData({ text: "", file: null });
      document.getElementById("fileInput").value = "";

      // Recarregar lista após um pequeno delay
      setTimeout(() => {
        fetchTexts();
      }, 1000);
    } catch (error) {
      const message = error.response?.data?.detail || "Erro ao processar email";
      toast.error(message);
    } finally {
      setProcessing(false);
    }
  };



  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Cabeçalho */}
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="mt-2 text-gray-400">
            Processe emails e visualize o histórico de classificações
          </p>
        </div>

        {/* Formulário de processamento */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Send className="h-5 w-5 mr-2 text-purple-500" />
            Processar Email
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="textArea"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Texto do Email
              </label>
              <textarea
                id="textArea"
                rows="4"
                value={formData.text}
                onChange={handleTextChange}
                disabled={!!formData.file}
                className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 text-white bg-gray-700 focus:outline-none focus:ring-purple-500 focus:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Digite o conteúdo do email aqui..."
              />
            </div>

            <div className="flex items-center justify-center">
              <span className="text-gray-400">OU</span>
            </div>

            <div>
              <label
                htmlFor="fileInput"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Upload de Arquivo (PDF/TXT)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  id="fileInput"
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.txt"
                  disabled={!!formData.text.trim()}
                  className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {formData.file && (
                  <div className="flex items-center text-green-400">
                    <FileText className="h-4 w-4 mr-1" />
                    <span className="text-sm">{formData.file.name}</span>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={processing || (!formData.text.trim() && !formData.file)}
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {processing ? (
                <Loading size="sm" text="" />
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Processar Email
                </>
              )}
            </button>
          </form>
        </div>

        {/* Histórico de emails */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-purple-500" />
            Histórico de Emails
          </h2>

          {loading ? (
            <div className="flex justify-center py-8">
              <Loading text="Carregando histórico..." />
            </div>
          ) : texts.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum email processado ainda</p>
            </div>
          ) : (
            <div className="space-y-4">
              {texts.map((text, index) => (
                <EmailResultCard key={text.id || index} text={text} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
